const input0 = `10
nyc
la
honolulu
lisbon
paris
madrid
istanbul
porto
london
barcelona
10 20
0 8
0 6
0 4
0 1
1 8
1 3
1 2
2 3
2 6
3 7
3 9
4 9
4 2
4 1
5 7
8 9
8 3
8 5
9 6
9 5`;

let input1 = `1
dublin
1 0`;

let input2 = `2
edinburgh
dublin
2 1
0 1`;

let input3 = `2
edinburgh
dublin
2 0`;

let input4 = `10
nyc
la
honolulu
lisbon
paris
madrid
istanbul
porto
london
barcelona
10 22
0 8
7 6
2 8
0 6
0 4
0 1
1 8
1 3
1 2
2 3
2 6
3 7
3 9
4 9
4 2
4 1
5 7
8 9
8 3
8 5
9 6
9 5`;

let input5 = `10
nyc
la
honolulu
lisbon
paris
madrid
istanbul
porto
london
barcelona
10 20
0 8
0 6
0 4
0 1
1 8
1 3
1 2
2 3
2 6
3 7
3 9
4 9
4 2
4 1
5 7
8 9
8 3
8 5
9 6
9 5`;

let input6 = `8
minsk0
brest1
vitebsk2
slutsk3
gomel4
la5
ny6
pa7
8 8
0 1
1 2
1 3
1 5
2 4
3 4
3 7
5 6
`;


function processData(input) {
    var data = input.split("\n");
    var vertices_count = Number(data[0]) + 1;
    var edges_count = Number(data[vertices_count].split(" ")[1]);
    var edges_index = vertices_count + 1;
    var vertices = data.slice(1, vertices_count);
    var edges = data.slice(edges_index, edges_index + edges_count).map(x => x.split(" ").map(y => Number(y)));

    var trip = new Euro_ishTrip(vertices, edges);
}


class Euro_ishTrip {
    constructor(vertices, edges) {
        this.directions = [];
        this.directions_named = [];

        this.cities = copy_array_1d(vertices);
        this.edges = copy_array_2d(edges);

        this.graph = this.cities.map(function(element, i) {
            element = [];

            this.edges.forEach(function(edge) {
                if (edge[0] == i) {
                    element.push(edge[1]);
                }
            });

            return element;
        }.bind(this));

        this.get_routes();
    }

    topological_sort_util(explored, indegree, route, directions) {
        var finished = false;

        this.graph.forEach(function(node, i) {
            if (!explored[i] && indegree[i] == 0) {
                explored[i] = true;
                route.push(i);
                node.forEach(function(edge) {
                    indegree[edge]--;
                });

                this.topological_sort_util(explored, indegree, route, directions);

                explored[i] = false;
                route.pop();
                node.forEach(function(edge) {
                    indegree[edge]++;
                });

                finished = true;
            }
        }.bind(this));

        if (!finished) {
            directions.push(copy_array_1d(route));
        }
    }


    topological_sort() {
        var explored = this.cities.map(x => false);
        var indegree = this.cities.map(x => 0);
        var pre_route = [];

        this.graph.forEach(function(graph) {
            graph.forEach(function(element) {
                indegree[element]++;
            })
        });

        this.topological_sort_util(explored, indegree, pre_route, this.directions);
    }

    print_directions() {
        this.directions.forEach(function(direction) {
            var result_string = "";

            direction.forEach(function(city, i) {
                if (i != direction.length - 1) {
                    result_string += this.cities[city] + ", ";
                } else {
                    result_string += this.cities[city];
                }
            }.bind(this));

            this.directions_named.push(result_string);
        }.bind(this));

        this.directions_named.sort();
        this.directions_named.forEach(function(direction) {
            console.log(direction);
        });
    }

    get_routes() {
        this.topological_sort();
        this.print_directions();
    }
}



function copy_array_1d(arr1) {
    return arr1.slice();
}

function copy_array_2d(arr1) {
    return arr1.map(x => x.slice()).slice();
}

processData(input3);