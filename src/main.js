import EXIF from "exif-js";
import MapBox from "./js/map";
import { validFileSize, getFileSize, validGPS, toDecimal } from "./js/exif-validators";

window.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.querySelector(".file-input");
  const preview = document.querySelector(".preview");
  const list = document.createElement("ul");
  const mapBox = new MapBox();

  function addItem(file) {
    // Getting EXIF data
    let longitude = EXIF.getTag(file, "GPSLongitude");
    let latitude = EXIF.getTag(file, "GPSLatitude");
    let width = EXIF.getTag(file, "PixelXDimension");
    let height = EXIF.getTag(file, "PixelYDimension");
    let fileSize = file.size;

    // Creating HTML container
    const listItem = document.createElement("li");
    const div = document.createElement("div");

    if (validFileSize(fileSize) && validGPS(longitude, latitude)) {
      // Converting cordinates to decimals
      let decimalLongitude = toDecimal(longitude);
      let decimalLatitude = toDecimal(latitude);
      let cordinates = [decimalLongitude, decimalLatitude];

      // Creating image
      const image = document.createElement("img");
      image.src = window.URL.createObjectURL(file);

      // Creating photo card
      div.innerHTML = `
        <p>Name: <b>${file.name}</b></p>
        <p>Size: <b>${getFileSize(fileSize)}</b></p>
        <p>Resolution: <b>${width}x${height}</b></p>
        <p>Type: <b>${file.type}</b></p>
        <p>Latitude: <b>${decimalLatitude}</b></p>
        <p>Longitude: <b>${decimalLongitude}</b></p>
        <p>
          <a
            target="_blank"
            href="https://www.google.com/maps/search/${decimalLatitude}+${decimalLongitude}">
            Google maps
          </a>
        </p>
      `;

      // Creating Delete button
      const deleteButton = document.createElement("button");
      deleteButton.className = "button is-fullwidth";
      deleteButton.innerText = "Delete item";
      deleteButton.addEventListener("click", () => {
        if (confirm("Are you sure want to delete?")) {
          setTimeout(() => {
            listItem.remove();
            if (cordinates) mapBox.removeMarker(cordinates);
          }, 1000);
        }
      });

      // Appending
      listItem.appendChild(image);
      listItem.appendChild(div);
      listItem.appendChild(deleteButton);
      mapBox.addMarker(cordinates);
    } else {
      div.innerHTML = `File <b>${file.name}</b> doesn't have EXIF data to show. Try another one!`;

      listItem.appendChild(div);

      setTimeout(() => {
        listItem.remove();
      }, 3000);
    }

    list.prepend(listItem);
  }

  fileInput.addEventListener("change", () => {
    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }

    let files = fileInput.files;

    if (files) {
      preview.appendChild(list);

      Array.from(files).forEach(file => {
        EXIF.getData(file, () => addItem(file));
      });
    }
  });
});