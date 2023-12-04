export default defineNuxtPlugin(() => {
  const dataMartController = new DataMartController();
  return {
    provide: {
      dataMartController,
    },
  };
});
