export default function useDataMart() {
  const dataMartStore = useDataMartStore();

  const getDataMartList = async () => {
    const { data: response } = await getDataMartListApi();
    dataMartStore.list = response.value.data;
  };

  return {
    getDataMartList,
  };
}
