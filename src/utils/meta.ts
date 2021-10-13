export enum Meta {
  initial = "initial", // Процесс загрузки не начат
  loading = "loading", // В процессе загрузки
  extraLoading = "extraLoading", // В процессе загрузки дополнительных ресурсов
  error = "error", // Завершилось с ошибкой
  success = "success", // Завершилось успешно
}
