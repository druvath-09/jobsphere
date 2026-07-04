import { Button } from '@/shared/components/ui';

interface JobsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
}

function buildPageWindow(currentPage: number, totalPages: number) {
  const windowSize = 3;
  const start = Math.max(1, currentPage - 1);
  const end = Math.min(totalPages, start + windowSize - 1);
  const pages = [] as number[];

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  return pages;
}

function JobsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: JobsPaginationProps) {
  const pageWindow = buildPageWindow(currentPage, totalPages);
  const firstPageInWindow = pageWindow[0];
  const lastPageInWindow = pageWindow[pageWindow.length - 1];

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center pt-2">

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </Button>

        {firstPageInWindow && firstPageInWindow > 1 && (
          <>
            <Button variant="ghost" size="sm" onClick={() => onPageChange(1)}>
              1
            </Button>
            <span className="px-1 text-text-secondary">...</span>
          </>
        )}

        {pageWindow.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}

        {lastPageInWindow && lastPageInWindow < totalPages && (
          <>
            <span className="px-1 text-text-secondary">...</span>
            <Button variant="ghost" size="sm" onClick={() => onPageChange(totalPages)}>
              {totalPages}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export { JobsPagination };