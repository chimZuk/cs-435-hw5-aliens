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
    var words = data.slice(1);
    var alphabet = new Aliens(words);
    alphabet.print()
}


class Aliens {
    constructor(words) {
        this.words = words;
        this.graph = [];
        this.letters = [];

        this.explored = [];
        this.pre_sorted = [];
        this.alphabet = [];
        this.alphabet_length = 0;
        this.alphabet_string = "";

        this.alphabet_creation(copy_array_1d(this.words));
        this.topological_sort();
    }

    alphabet_creation(words) {
        var last_letter = words[0][0];
        var words_queue = [];

        words.forEach(function(word) {
            if (word[0] == last_letter) {
                words_queue.push(word.slice(1));
            } else {
                this.add_letter(last_letter);
                this.add_letter(word[0]);

                this.add_edge(last_letter, word[0]);

                if (this.alphabet_creation_empty_check(words_queue)) {
                    this.alphabet_creation(copy_array_1d(words_queue));
                }

                last_letter = word[0];
                words_queue = [word.slice(1)];
            }
        }.bind(this));

        if (this.alphabet_creation_empty_check(words_queue)) {
            this.alphabet_creation(copy_array_1d(words_queue));
        }
        this.add_letter(last_letter);

        last_letter = "";
        words_queue = [];
    }

    alphabet_creation_empty_check(words_queue) {
        for (var i = 0; i < words_queue.length; i++) {
            if (words_queue[i] == "") {
                words_queue.splice(i, 1);
                i--;
            }
        }
        return words_queue.length != 0;
    }

    add_letter(letter) {
        if (this.letters.indexOf(letter) == -1) {
            this.letters.push(letter);
            this.graph.push([]);
        }
    }

    add_edge(a, b) {
        var index_of_a = this.letters.indexOf(a);
        var index_of_b = this.letters.indexOf(b);

        if (this.graph[index_of_a].indexOf(index_of_b) == -1) {
            this.graph[index_of_a].push(index_of_b);
        }
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
        this.graph.forEach(function(edge, index) {
            if (this.explored.indexOf(index) == -1) {
                this.topological_sort_helper(index, this.explored, this.pre_sorted);
            }
        }.bind(this));

        var temp_aplhabet = [];

        while (this.pre_sorted.length != 0) {
            temp_aplhabet.unshift(this.letters[this.pre_sorted.splice(0, 1)[0]]);
        }
        this.alphabet = copy_array_1d(temp_aplhabet);
        this.alphabet_length = this.alphabet.length;

        this.alphabet.forEach(function(element, i) {
            if (element) {
                this.alphabet_string += element + " ";
            }
        }.bind(this));

        this.alphabet_string = this.alphabet_string.trim();
    }

    print() {
        console.log(this.alphabet_string);
    }
}

function copy_array_1d(arr1) {
    return arr1.slice();
}

function copy_array_2d(arr1) {
    return arr1.map(x => x.slice()).slice();
}

processData(input2);