import { describe, expect, it } from "vitest";

import { parseNumberInput } from "@/lib/converters/binary-translator/parser";
import {
  encodeText,
  decodeBytes,
} from "@/lib/converters/binary-translator/encoding-converter";
import { formatBytes } from "@/lib/converters/binary-translator/number-converter";
import { convertInput } from "@/lib/converters/binary-translator/translator";

describe("Binary Translator Parser", () => {
  it("parses space-separated binary", () => {
    expect(
      parseNumberInput("01001000 01101001", "binary"),
    ).toEqual([72, 105]);
  });

  it("parses comma-separated binary", () => {
    expect(
      parseNumberInput("01001000,01101001", "binary"),
    ).toEqual([72, 105]);
  });

  it("parses continuous binary", () => {
    expect(
      parseNumberInput("0100100001101001", "binary"),
    ).toEqual([72, 105]);
  });

  it("parses decimal values", () => {
    expect(
      parseNumberInput("72 105", "decimal"),
    ).toEqual([72, 105]);
  });

  it("parses hexadecimal values", () => {
    expect(
      parseNumberInput("48 69", "hexadecimal"),
    ).toEqual([72, 105]);
  });

  it("parses octal values", () => {
    expect(
      parseNumberInput("110 151", "octal"),
    ).toEqual([72, 105]);
  });

  it("supports a custom delimiter", () => {
    expect(
      parseNumberInput(
        "01001000|01101001",
        "binary",
        "|",
      ),
    ).toEqual([72, 105]);
  });

  it("supports optional binary prefixes", () => {
    expect(
      parseNumberInput(
        "0b01001000 0b01101001",
        "binary",
        "",
        true,
      ),
    ).toEqual([72, 105]);
  });

  it("supports optional binary postfixes", () => {
    expect(
      parseNumberInput(
        "01001000b 01101001b",
        "binary",
        "",
        false,
        true,
      ),
    ).toEqual([72, 105]);
  });

  it("rejects invalid binary", () => {
    expect(() =>
      parseNumberInput("01001200", "binary"),
    ).toThrow();
  });

  it("rejects incomplete continuous binary", () => {
    expect(() =>
      parseNumberInput("0100100", "binary"),
    ).toThrow();
  });

  it("rejects decimal values above 255", () => {
    expect(() =>
      parseNumberInput("256", "decimal"),
    ).toThrow();
  });

  it("rejects invalid hexadecimal", () => {
    expect(() =>
      parseNumberInput("GG", "hexadecimal"),
    ).toThrow();
  });

  it("rejects invalid octal", () => {
    expect(() =>
      parseNumberInput("888", "octal"),
    ).toThrow();
  });

  it("rejects empty input", () => {
    expect(() =>
      parseNumberInput("", "binary"),
    ).toThrow();
  });
});

describe("Character Encoding", () => {
  it("encodes UTF-8 text", () => {
    expect(
      Array.from(encodeText("Hi", "UTF-8")),
    ).toEqual([72, 105]);
  });

  it("decodes UTF-8 bytes", () => {
    expect(
      decodeBytes([72, 105], "UTF-8"),
    ).toBe("Hi");
  });

  it("encodes ASCII text", () => {
    expect(
      Array.from(encodeText("ABC", "ASCII")),
    ).toEqual([65, 66, 67]);
  });

  it("rejects unsupported ASCII characters", () => {
    expect(() =>
      encodeText("Hello €", "ASCII"),
    ).toThrow();
  });

  it("encodes UTF-16LE", () => {
    expect(
      Array.from(encodeText("A", "UTF-16LE")),
    ).toEqual([65, 0]);
  });

  it("encodes UTF-16BE", () => {
    expect(
      Array.from(encodeText("A", "UTF-16BE")),
    ).toEqual([0, 65]);
  });

  it("decodes UTF-16LE", () => {
    expect(
      decodeBytes([65, 0], "UTF-16LE"),
    ).toBe("A");
  });

  it("decodes UTF-16BE", () => {
    expect(
      decodeBytes([0, 65], "UTF-16BE"),
    ).toBe("A");
  });

  it("rejects odd-length UTF-16 input", () => {
    expect(() =>
      decodeBytes([65], "UTF-16LE"),
    ).toThrow();
  });

  it("encodes Windows-1252 special characters", () => {
    expect(
      Array.from(encodeText("€", "Windows-1252")),
    ).toEqual([128]);
  });
});

describe("Number Converter", () => {
  it("formats binary", () => {
    expect(
      formatBytes([72, 105], "binary"),
    ).toBe("01001000 01101001");
  });

  it("formats decimal", () => {
    expect(
      formatBytes([72, 105], "decimal"),
    ).toBe("72 105");
  });

  it("formats octal", () => {
    expect(
      formatBytes([72, 105], "octal"),
    ).toBe("110 151");
  });

  it("formats hexadecimal", () => {
    expect(
      formatBytes([72, 105], "hexadecimal"),
    ).toBe("48 69");
  });
});

describe("Complete Translator", () => {
  it("converts binary to text", () => {
    const result = convertInput("01001000 01101001", {
      from: "binary",
      to: "text",
      encoding: "UTF-8",
      delimiter: "",
      usePrefix: false,
      usePostfix: false,
    });

    expect(result.output).toBe("Hi");
    expect(result.byteCount).toBe(2);
  });

  it("converts text to binary", () => {
    const result = convertInput("Hi", {
      from: "text",
      to: "binary",
      encoding: "UTF-8",
      delimiter: "",
      usePrefix: false,
      usePostfix: false,
    });

    expect(result.output).toBe("01001000 01101001");
  });

  it("converts binary to hexadecimal", () => {
    const result = convertInput("01001000 01101001", {
      from: "binary",
      to: "hexadecimal",
      encoding: "UTF-8",
      delimiter: "",
      usePrefix: false,
      usePostfix: false,
    });

    expect(result.output).toBe("48 69");
  });

  it("converts hexadecimal to decimal", () => {
    const result = convertInput("48 69", {
      from: "hexadecimal",
      to: "decimal",
      encoding: "UTF-8",
      delimiter: "",
      usePrefix: false,
      usePostfix: false,
    });

    expect(result.output).toBe("72 105");
  });

  it("converts decimal to text", () => {
    const result = convertInput("72 105", {
      from: "decimal",
      to: "text",
      encoding: "UTF-8",
      delimiter: "",
      usePrefix: false,
      usePostfix: false,
    });

    expect(result.output).toBe("Hi");
  });

  it("converts text to hexadecimal", () => {
    const result = convertInput("Hi", {
      from: "text",
      to: "hexadecimal",
      encoding: "UTF-8",
      delimiter: "",
      usePrefix: false,
      usePostfix: false,
    });

    expect(result.output).toBe("48 69");
  });

  it("rejects empty input", () => {
    expect(() =>
      convertInput("", {
        from: "binary",
        to: "text",
        encoding: "UTF-8",
        delimiter: "",
        usePrefix: false,
        usePostfix: false,
      }),
    ).toThrow();
  });
});