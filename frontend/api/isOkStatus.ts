function isOkStatus(status: number) {
  return status >= 200 && status < 300;
}

export default isOkStatus;
