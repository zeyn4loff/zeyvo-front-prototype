export default function PageLoadingIndicator() {
  return <div role="status" aria-label="Səhifə yüklənir" className="flex min-h-dvh items-center justify-center bg-second">
    <span aria-hidden="true" className="size-11 animate-spin rounded-full border-[4px] border-brand-primary border-t-transparent motion-reduce:animate-none" />
  </div>;
}
