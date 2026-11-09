import { tools } from '@/data/tools';
import ToolGrid from '@/components/tools/ToolGrid';

export default function RecentlyAdded() {
  const recentTools = [...tools]
    .filter((tool) => tool.status === 'active')
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime(),
    )
    .slice(0, 4);

  return (
    <section className="container-main py-16">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold text-primary">
          NEW AND USEFUL
        </p>

        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Recently Added Tools
        </h2>
      </div>

      <ToolGrid tools={recentTools} />
    </section>
  );
}