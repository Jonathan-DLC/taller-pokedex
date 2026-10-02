

async function buscarPokemon() {
  const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  const datos = await respuesta.json();
  
 
  const types = datos.types;
  const stats = datos.stats; 
  const abilities = datos.abilities;
  
  console.log("========== PARTE 1: Explorar API (Pikachu) ==========");
  console.log("Nombre:", datos.name);
  console.log("Número de Pokedex:", datos.id);
  console.log("Peso:", datos.weight);
  console.log("Altura:", datos.height);
  console.log("Habilidad 1:", abilities[0].ability.name);
  console.log("Habilidad 2:", abilities[1].ability.name);
  console.log("Tipo: ", types[0].type.name);
  console.log("Estadísticas:");
  console.log("HP (Vida):", stats[0].base_stat);
  console.log("Ataque:", stats[1].base_stat);
  console.log("Defensa:", stats[2].base_stat);
  console.log("Velocidad:", stats[5].base_stat);
}

buscarPokemon();