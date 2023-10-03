# Чек-лист рефакторинга

---

## API

Новое API находится в `/api`

- [x] Протестировать совместимость с новым API
- [x] Изменить логику запросов к API
  - [x] Добавить проверку статус-кодов (частично)
  - [x] Добавить валидацию через `zod`
  - [x] В целом сделать более строгую типизацию при работе с API
- [ ] Добавлять новые обработчики API по мере их реализации
  - [x] `/v2/auth/registration/<account_type>`
  - [x] `/v2/organizations/create`
  - [x] `/v2/organizations/get/all`
  - [x] `/v2/organizations/get/statistics/<organization_id>`
  - [x] `/v2/organizations/get/statistics/bad_guys/<organization_id>`
  - [x] `/v2/organizations/get/map/<organization_id>`
  - [x] `/v2/organizations/get/schedule/<organization_id>`
  - [x] `/v2/auth/forms`
  - [x] `/v2/auth/login`
  - [x] `/v2/inspections/create`
  - [x] `/v2/inspections/get/schemes/<inspection_type>`
  - [x] `/v2/inspections/get`
  - [ ] `/v2/inspections/get_new`
  - [x] `/v2/users/update/password/`
  - [x] `/v2/users/update/avatar/`
  - [x] `/v2/users/attach/to/organization/`
  - [x] `/v2/users/delete/history/`
  - [x] `/v2/patients/get/<user_id>`
  - [x] `/v2/patients/get/attached/<doctor_id>`
  - [x] `/v2/patients/get/dettached/<doctor_id>`
- [ ] Интегрировать новые обработчики в код
  - [x] `/v2/auth/registration/<account_type>`
  - [x] `/v2/organizations/create`
  - [x] `/v2/organizations/get/all`
  - [ ] `/v2/organizations/get/statistics/<organization_id>`
  - [ ] `/v2/organizations/get/statistics/bad_guys/<organization_id>`
  - [ ] `/v2/organizations/get/map/<organization_id>`
  - [ ] `/v2/organizations/get/schedule/<organization_id>`
  - [x] `/v2/auth/forms`
  - [x] `/v2/auth/login`
  - [ ] `/v2/inspections/create`
  - [ ] `/v2/inspections/get/schemes/<inspection_type>`
  - [x] `/v2/inspections/get`
  - [ ] `/v2/inspections/get_new`
  - [ ] `/v2/users/update/password/`
  - [x] `/v2/users/update/avatar/`
  - [ ] `/v2/users/attach/to/organization/`
  - [ ] `/v2/users/delete/history/`
  - [x] `/v2/patients/get/<user_id>`
  - [x] `/v2/patients/get/attached/<doctor_id>`
  - [x] `/v2/patients/get/dettached/<doctor_id>`

---

## Чистка

- [ ] Разобрать остатки кода, оставшиеся от рефакторинга `redux`
