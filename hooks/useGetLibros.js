import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_KEY = "libros_cache";
const CACHE_TIME = 1000 * 60 * 60; // 1 hora


import { useState, useEffect } from "react";
import getDataLibros from "../services/getDataLibro";

export const useGetLibros = () => {
  const [dataCadaLibro, setDataCadaLibro] = useState([]);

  useEffect(() => {
    async function loadLibros() {
      const url =
        "https://archive.org/advancedsearch.php?q=collection:librivoxaudio+language:spa&output=json&rows=10";

      const response = await fetch(url);
      const data = await response.json();

      const librosDocs = data.response.docs.map((doc) => ({
        title: doc.title,
        creator: doc.creator,
        identifier: doc.identifier,
        description: doc.description,
      }));

      return librosDocs;
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

      // Guardar en cache
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(resultados));
    }

    async function main() {
      // 1. Intentar cargar cache
      const cached = await AsyncStorage.getItem(CACHE_KEY);
      if (cached) {
        console.log("Cargando datos desde cache...");
        setDataCadaLibro(JSON.parse(cached));
        return; // usamos la cache
      }

      // 2. Si no hay cache, descargar
      console.log("No hay cache, descargando datos...");
      const arrLibros = await loadLibros();
      await loadDataDeCadaLibro(arrLibros);
    }

    main();
  }, []);

  return { dataCadaLibro };
}