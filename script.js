const input0 = `3
caa
aaa
aab`;

let input1 = `9
caa
eeb
eef
aaa
aab
deed
deeb
def
daad`;

let input2 = `6
caf
eca
eae
eab
eeb
eef`;

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
        this.explored = [];
        this.pre_sorted = [];
        this.directions = [];


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

    topological_sort_helper(index, explored, pre_sorted) {
        explored.push(index);

        this.graph[index].forEach(function(node) {
            if (explored.indexOf(node) == -1) {
                this.topological_sort_helper(node, explored, pre_sorted);
            }
        }.bind(this));

        pre_sorted.push(index);
    }

    topological_sort() {
        this.graph.forEach(function(vertice, index) {
            if (this.explored.indexOf(index) == -1) {
                this.topological_sort_helper(index, this.explored, this.pre_sorted);
            }
        }.bind(this));

        var temp_direction = [];

        while (this.pre_sorted.length != 0) {
            temp_direction.push(this.cities[this.pre_sorted.splice(0, 1)[0]]);
        }
        this.directions.push(temp_direction);
    }

    output_routes() {
        this.directions.forEach(function(route) {
            var route_result = "";

            route.forEach(function(city, index) {
                if (index != 0) {
                    route_result = city + ", " + route_result;
                } else {
                    route_result = city;
                }
            });

            console.log(route_result);
        });
    }

    get_routes() {
        this.topological_sort()
        this.output_routes();
    }
}



function copy_array_1d(arr1) {
    return arr1.slice();
}

function copy_array_2d(arr1) {
    return arr1.map(x => x.slice()).slice();
}

processData(input2);