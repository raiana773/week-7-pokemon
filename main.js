// Асинхронность, промисы и HTTP.  Домашняя работа

// Задание №1
// Создать программу - список покемонов.

// Пример:
// Bulbasaur
// Ivysaur
// Venusaur
// Charmander
// Charmeleon
// Charizard
// Squirtle
// … и т.п.

// При клике на имя покемона, показать рядом (в соседнем div-е) или во всплывающем
// окне информацию об этом покемоне, например:

// Имя: Charmeleon
// Тип: fire
// Рост: 11
// Вес: 190
// Изображение покемона (дополнительно)

const API = "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20";
let app = document.getElementById("app");
// console.log(app);

async function getPokemons() {
  let response = await fetch(API)
    .then(res => res.json())
    .catch(err => console.log(err));
  console.log(response);
  response.results.forEach(item => {
    let newElem = document.createElement("div");
    newElem.innerText = item.name;
    newElem.className = "pokemon";
    newElem.id = item.url;
    app.append(newElem);
  });
}
getPokemons();
let info = document.getElementById("info");
// console.log(info);
document.addEventListener("click", async function (e) {
  if (e.target.className === "pokemon") {
    let response = await fetch(e.target.id)
      .then(res => res.json())
      .catch(err => console.log(err));
    console.log(response);
    info.innerHTML = `
    <div>Имя ${response.name}</div>
    <div>Рост ${response.height}</div>
    <div>Вес ${response.weight}</div>
    <div>Тип ${response.types[0].type.name}</div>
    <img src=${response.sprites.front_default} />
    <img src=${response.sprites.back_default} />
    <img src=${response.sprites.back_shiny} />
    <img src=${response.sprites.front_shiny} />`;

    // console.log(`Рост ${response.height}`);
    // console.log(`Вес ${response.weight}`);
    // console.log(`Имя ${response.name}`);
    // console.log(`Тип ${response.types[0]}.type.name`);
  }
  console.log(e.target.id);
});

// Указания:
// Список покемонов (первые 20 штук) получить через запрос к API:
// https://pokeapi.co/api/v2/pokemon/
// Информацию о каждом покемоне получать через запрос к API:
// https://pokeapi.co/api/v2/pokemon/{id}/
// где {id} - номер покемона
// Подсказка об используемых ключах результата
// (предположим что полученный объект у вас лежит в переменной result)
// Изображение: result.sprites.front_default
// Имя: result.name
// Тип: массив result.types. Из каждого элемента массива можно взять только type.name
// Рост: result.height
// Вес: result.weight

// Дополнительно:
// Используя ссылку на следующую страницу в результате (ссылку на API следующих
// результатов) реализовать пагинацию (постраничный вывод) в программе, т.е.:
// На клик по ссылке “Next” делать запрос на следующие 20 штук, заменять текущий список.
// Реализовать “Previous” и “Next” - возможность возвращаться на страницу ранее

// Задание №2
// Создать страницу прогноза погоды.

// Дан API - https://goweather.herokuapp.com/weather/{city}
// {city} – название нужного города (подставить из инпута);
// Название города нужно получить из инпута, после нажатия на кнопку.
// <input id="city-name" type="text">
// <button id="show">Show Weather</button>

// При клике на кнопку, отобразите на странице температуру
// воздуха на сегодняшний день и среднюю скорость ветра.
// Также, отобразите прогноз погоды на ближайшие три дня.
// Если введенного города нет, выведите в alert соответствующее сообщение.
// Примечание! Если город не найден, API вернет пустые строчки в качестве значений свойств.

// Подсказка об используемых ключах результата:
// (предположим что полученный объект у вас лежит в переменной result)
// Температура: result.temperature
// Средняя скорость ветра: result.wind

// Прогноз погоды на ближайшие дни находится в массиве forecast.
// result.forecast
