import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

/**
 * Container padding variants using class-variance-authority.
 *
 * Controls horizontal padding at different breakpoints.
 * Max-width is always 1280px with auto centering.
 */
const containerVariants = cva('mx-auto w-full max-w-[1280px]', {
  variants: {
    padding: {
      none: 'px-0',
      sm: 'px-4 sm:px-6',
      md: 'px-4 sm:px-6 lg:px-8',
      lg: 'px-6 sm:px-8 lg:px-12',
    },
  },
  defaultVariants: {
    padding: 'md',
  },
});

interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  /**
   * Render as a different HTML element.
   * Defaults to `div`. Useful for semantic sections like `<section>` or `<main>`.
   */
  as?: 'div' | 'section' | 'main' | 'article';
}

/**
 * Container — a responsive, centered content wrapper.
 *
 * Centers content horizontally with a max-width of 1280px
 * and configurable responsive padding.
 *
 * @example
 * // Default padding (md)
 * <Container>
 *   <h1>Page content</h1>
 * </Container>
 *
 * // Larger padding
 * <Container padding="lg">
 *   <h1>Spacious content</h1>
 * </Container>
 *
 * // No padding (for full-bleed children)
 * <Container padding="none">
 *   <img src="banner.jpg" alt="" className="w-full" />
 * </Container>
 *
 * // Semantic section
 * <Container as="section">
 *   <h2>Featured Jobs</h2>
 * </Container>
 */
const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, padding, as: Element = 'div', ...props }, ref) => (
    <Element
      ref={ref}
      className={cn(containerVariants({ padding }), className)}
      {...props}
    />
  ),
);
Container.displayName = 'Container';

export { Container, containerVariants };
export type { ContainerProps };
