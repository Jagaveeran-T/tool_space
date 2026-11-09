import { categories } from '@/data/categories';
import { getToolsByCategory } from '@/data/tools';
import CategoryCard from '@/components/tools/CategoryCard';

export default function Categories() {
  // Only show categories that have at least one active tool.
  const visibleCategories = categories.filter(
    (category) => getToolsByCategory(category.name).length > 0,
  );

  return (
    <section className="bg-muted/40 py-16">
      <div className="container-main">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-primary">
            EXPLORE
          </p>

          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Browse by Category
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Find the right tool for your needs.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>
      </div>
    </section>
  );
}