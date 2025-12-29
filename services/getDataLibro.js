async function getLibroData(identifier, title, creator, description) {
  try {
    const url = "https://archive.org/metadata/" + identifier;

    const response = await fetch(url);
    if (!response.ok) throw new Error("No se pudo obtener la metadata");

    const data = await response.json();

    const domini = data.d1;

    const dataFiles = data.files;

    const mp3 = dataFiles.filter(
      (audio) => audio.format === "VBR MP3" || audio.format === "64Kbps MP3"
    );
    return {
      mp3,
      png: "__ia_thumb.jpg",
      dir: data.dir,
      title,
      creator,
      description,
      domini,
      identifier,
    };
  } catch (error) {
    console.error("Error en getLibroData:", error);
  }
}
export default getLibroData;
