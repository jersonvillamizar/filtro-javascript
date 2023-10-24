var personas = [
    { nombre: "Alice", edad: 25 },
    { nombre: "Bob", edad: 30 },
    { nombre: "Charlie", edad: 20 },
];

personas.sort(function(a, b) {
    // Compara por nombre
    if (a.nombre < b.nombre) {
        return -1;
    } else if (a.nombre > b.nombre) {
        return 1;
    } else {
        // Si los nombres son iguales, compara por edad
        if (a.edad < b.edad) {
            return -1;
        } else if (a.edad > b.edad) {
            return 1;
        } else {
            return 0;
        }
    }
});

/* En este código, la función de comparación personalizada toma dos objetos a y b y compara primero sus nombres. Si los nombres son iguales, compara sus edades. El valor de retorno de la función de comparación determina el orden en el que se colocan los elementos en el array final:

Si la función devuelve un número negativo, a se coloca antes que b.
Si la función devuelve un número positivo, b se coloca antes que a.
Si la función devuelve 0, se considera que a y b son iguales en términos de orden.
Después de ejecutar este código, el array personas estará ordenado primero por nombre y, en caso de nombres iguales, por edad.

Recuerda que la función sort() modifica el array original. Si deseas mantener el array original sin cambios y obtener una nueva versión ordenada, puedes clonar el array antes de ordenarlo.
 */




