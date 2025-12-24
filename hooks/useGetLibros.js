import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_KEY = "libros_cache";
const CACHE_TIME = 1000 * 60 * 60; // 1 hora

export default function useGetLibros() {
  const getLibros = async () => {
    try {
      const cache = await AsyncStorage.getItem(CACHE_KEY);

      if (cache) {
        const { data, timestamp } = JSON.parse(cache);

        if (Date.now() - timestamp < CACHE_TIME) {
          console.log("📦 usando cache");
          return data;
        }
      }

      console.log("🌐 pidiendo a la API");
      const response = await fetch(
        "https://archive.org/advancedsearch.php?q=collection:librivoxaudio+language:spa&output=json&rows=10"
      );
      const json = await response.json();
      const docs = json.response.docs;

      const dataRes = docs.map((doc) => ({
        title: doc.title,
        creator: doc.creator,
        identifier: doc.identifier,
      }));
      await AsyncStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: dataRes,
          timestamp: Date.now(),
        })
      );

      return dataRes;
    } catch (error) {
      console.error("Error fetching libros:", error);
      return [];
    }
  };

  return { getLibros };
}
