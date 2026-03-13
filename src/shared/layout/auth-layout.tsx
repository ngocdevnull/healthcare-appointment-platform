import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen">
      <div className="flex w-1/2 items-center justify-center bg-auth-bg p-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

      <aside className="relative w-1/2">
        <Image
          src="/images/background.png"
          alt="Healthcare background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-8 left-8 z-10">
          <Image
            src="/icons/doct.svg"
            alt="Doct logo"
            width={103}
            height={44}
            priority
          />
        </div>
      </aside>
    </main>
  );
}
