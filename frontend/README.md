# Цифровой аватар

---

### Запуск

1. Установить зависимости

```bash
$ yarn install
```

2. Запуск

   - Режим разработки

   ```bash
   $ yarn dev
   ```

   - Режим деплоя

   ```bash
   $ yarn build
   $ yarn start
   ```

---

### Файлы

`/pages` - компоненты, генерируемые в страницы - [Next.js](https://nextjs.org/docs/basic-features/pages)

`/layouts` - макеты страниц - [Next.js](https://nextjs.org/docs/basic-features/layouts)

`/public/locales` - файлы локализации - [next-i18next](https://github.com/isaachinman/next-i18next)

`/redux` - [Redux Toolkit](https://redux-toolkit.js.org/)

`/utils/api` - описание запросов к api

---

### Типы данных

- Patient

```typescript
{
  id: number;

  firstName: string;
  lastName: string;

  phone: string;

  sex: number;

  birthday: string;
  age: number;

  weight: number;
  height: number;
  insure_number: string;

  risks: string[];
  recommendations: string[];

  last_inspection: string | undefined; // результат последнего осмотра
};
```

- Inspection

```typescript
{
  id: number;
  patient_id: number;

  datetime_created: string;
  access: boolean;
  inspection_type: string;

  json_data: Object; // данные осмотра, формат зависит от типа
}
```

- ECG Event

```typescript
{
  name: string;
  start: number; // индекс первого измерения
  end: number; // инедкс последнего измерения
}
```

