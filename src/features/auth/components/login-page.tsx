import { LoginForm } from './login-form';

const ENTERPRISE_BANK_URL = 'https://www.enterprisebank.ph/';

export function LoginPage() {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <section className="flex flex-col gap-4 p-6 md:p-10">
        <header className="flex justify-center gap-2 md:justify-start">
          <a href={ENTERPRISE_BANK_URL}>
            <img
              src="/enterprise_bank-logo.png"
              alt="Enterprise Bank Inc"
              className="h-8 object-contain"
            />
          </a>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight">ALAS (CL)</h1>
              <p className="text-sm text-muted-foreground mt-1">Enterprise Bank Inc.</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </section>
      <section className="relative hidden overflow-hidden lg:block" aria-hidden="true">
        <img
          src="/EBI_bg_login.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-125 object-cover blur-xl dark:brightness-[0.2] dark:grayscale"
        />
        <img
          src="/EBI_bg_login.png"
          alt=""
          className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
        />
      </section>
    </main>
  );
}
