import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import getDataLibros from "../services/getDataLibro";

export const useGetLibros = (page) => {
  const [dataCadaLibro, setDataCadaLibro] = useState([]);
  const CACHE_KEY = `libros_cache_page_${page}`;

  useEffect(() => {
    async function loadLibros() {
      const url = `https://archive.org/advancedsearch.php?q=collection:librivoxaudio+language:spa&output=json&rows=10&page=${page}`;

      const response = await fetch(url);
      const data = await response.json();

      return data.response.docs.map((doc) => ({
        title: doc.title,
        creator: doc.creator,
        identifier: doc.identifier,
        description: doc.description,
      }));
    }

    async function loadDataDeCadaLibro(arrLibros) {
      const resultados = [];

      for (const libro of arrLibros) {
        const data = await getDataLibros(
          libro.identifier,
          libro.title,
          libro.creator,
          libro.description
        );
        resultados.push(data);
      }

      setDataCadaLibro(resultados);
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(resultados));
    }

    async function main() {
      const cached = await AsyncStorage.getItem(CACHE_KEY);

      if (cached) {
        console.log("Cache página", page);
        setDataCadaLibro(JSON.parse(cached));
        return;
      }

      console.log("Fetch página", page);
      const arrLibros = await loadLibros();
      await loadDataDeCadaLibro(arrLibros);
    }

    main();
  }, [page]);

  return { dataCadaLibro };
};
