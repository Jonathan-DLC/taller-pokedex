

// --- EJERCICIO 2: buscarPokemon ---
async function buscarPokemon(nombre) {
  const url = "https://pokeapi.co/api/v2/pokemon/" + nombre.toLowerCase();
  const respuesta = await fetch(url);
  
  if (!respuesta.ok) {
    console.log("Error al buscar '" + nombre + "' - Status:", respuesta.status);
    return null;
  }
  return await respuesta.json();
}

// --- EJERCICIO 1 y 3: mostrarFicha ---
function mostrarFicha(datos) {
  if (!datos) {
    console.log("No hay datos para mostrar.");
    return;
  }
  
  console.log("\n========== FICHA DE POKÉMON ==========");
  console.log("Nombre:", datos.name.toUpperCase(), "- ID:", datos.id);

  const nombresTipos = [];
  for (const t of datos.types) {
    nombresTipos.push(t.type.name);
  }
  console.log("Tipos:", nombresTipos.join(" / "));
  
  console.log("Altura:", datos.height * 10, "cm");
  console.log("Peso:", datos.weight / 10, "kg");
  
   console.log("Habilidades:");
  for (const a of datos.abilities) {
    if (a.is_hidden) {
      console.log(" -", a.ability.name, "(oculta)");
    } else {
      console.log(" -", a.ability.name);
    }
  }

  console.log("Estadísticas:");
  for (const s of datos.stats) {
    console.log(" -", s.stat.name + ":", s.base_stat);
  }
  console.log("=======================================\n");
}

// --- EJERCICIO 4: obtenerStat y compararPokemon ---
function obtenerStat(datos, nombreStat) {
  for (let i = 0; i < datos.stats.length; i++) {
    if (datos.stats[i].stat.name === nombreStat) {
      return datos.stats[i].base_stat;
    }
  }
  return null;
}

async function compararPokemon(nombre1, nombre2, stat) {
  let poke1 = await buscarPokemon(nombre1);
  let poke2 = await buscarPokemon(nombre2);

  if (poke1 === null || poke2 === null) {
    console.log("No se pueden comparar porque uno o ambos pokemon no existen.");
    return;
  }

  let valor1 = obtenerStat(poke1, stat);
  let valor2 = obtenerStat(poke2, stat);

  if (valor1 === null || valor2 === null) {
    console.log("Error: La estadistica no existe.");
    return;
  }

  console.log("");
  console.log("--- BATALLA DE " + stat.toUpperCase() + " ---");
  console.log(poke1.name.toUpperCase() + " (" + valor1 + ") VS " + poke2.name.toUpperCase() + " (" + valor2 + ")");
  
  if (valor1 > valor2) {
    console.log("Ganador: " + poke1.name.toUpperCase());
  } else if (valor2 > valor1) {
    console.log("Ganador: " + poke2.name.toUpperCase());
  } else {
    console.log("Es un empate");
  }
}

// --- EJERCICIO 5: pokemonMasFuerte ---
async function pokemonMasFuerte(listaNombres, stat) {
  let mejorNombre = "";
  let mejorValor = -1;

  for (let i = 0; i < listaNombres.length; i++) {
    let nombreActual = listaNombres[i];
    let datos = await buscarPokemon(nombreActual);

    if (datos === null) {
      continue;
    }

    let valorActual = obtenerStat(datos, stat);

    if (valorActual === null) {
      continue;
    }

    if (valorActual > mejorValor) {
      mejorValor = valorActual;
      mejorNombre = nombreActual;
    }
  }

  console.log("El pokemon mas fuerte de la lista en " + stat + " es: " + mejorNombre.toUpperCase());
  return mejorNombre;
}

// --- PRUEBA FINAL DEL TALLER ---
async function probar() {
  console.log("\n=========================================");
  console.log("   EJERCICIO 2 Y 3: MOSTRAR FICHAS       ");
  console.log("=========================================\n");
  
  let poke1 = await buscarPokemon("snorlax");
  mostrarFicha(poke1);
  
  let poke2 = await buscarPokemon("gengar");
  mostrarFicha(poke2);
  
  console.log("Probando un pokemon que no existe (error controlado):");
  await buscarPokemon("pokemondementira");

  console.log("\n=========================================");
  console.log("   EJERCICIO 4: BATALLAS POKEMON         ");
  console.log("=========================================\n");
  
  await compararPokemon("snorlax", "machamp", "attack");
  await compararPokemon("onix", "cloyster", "defense");
  await compararPokemon("pikachu", "squirtle", "fuerza");

  console.log("\n=========================================");
  console.log("   EJERCICIO 5: DESAFIO FINAL (EQUIPO)   ");
  console.log("=========================================\n");
  
  let miEquipo = ["pikachu", "charizard", "snorlax", "machamp", "gengar", "onix"];
  
  console.log("Buscando el mas fuerte en ataque...");
  let ganadorAtaque = await pokemonMasFuerte(miEquipo, "attack");
  
  console.log("");
  console.log("Buscando el mas fuerte en defensa...");
  let ganadorDefensa = await pokemonMasFuerte(miEquipo, "defense");
  
  console.log("");
  console.log("Mostrando ficha del ganador de ataque:");
  let datosGanador = await buscarPokemon(ganadorAtaque);
  mostrarFicha(datosGanador);
}

probar();