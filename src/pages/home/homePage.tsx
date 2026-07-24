export function HomePage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <header className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Информация о проекте & Статус разработки
        </h1>
      </header>

      <section className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
          Данные для входа (Администратор)
        </h2>
        <div className="space-y-2 font-mono text-sm bg-white dark:bg-slate-950 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 w-20">Email:</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400 select-all">
              admin@example.com
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 w-20">Пароль:</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400 select-all">
              Admin123
            </span>
          </div>
        </div>
      </section>

      <section className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-amber-900 dark:text-amber-200 mb-4 flex items-center gap-2">
          Не успел сделать к сдаче
        </h2>
        <ul className="space-y-3 text-sm text-amber-950 dark:text-amber-300">
          <li className="flex items-start gap-2">
            <span className="font-bold text-amber-500">•</span>
            <span>Не готова полноценная страница Home.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-amber-500">•</span>
            <span>
              Администратор по правам доступа пока совпадает с Рекрутером
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-amber-500">•</span>
            <span>Кнопка отклика в вакансиях не работает.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-amber-500">•</span>
            <span>
              Аутентификация через сторонние сервисы (OAuth / Google / GitHub)
              не реализована.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-amber-500">•</span>
            <span>темы не реализованы</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
