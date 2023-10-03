function useOrgans(patientId: number) {
  const data = {
    brain: true,
    heart: true,
    lungs: true,
    circulatory: true,
  };

  return { data };
}

export default useOrgans;
