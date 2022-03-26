    console.log("test");

    let cat_data = []; //variable to hold array of cat objects
    let cat_types = [];
    let cat_colors = [];
    let cat_genders = [];

    fetch("./cats.json")
        .then(response => response.json())
        .then(data => {
            //fills variables with appropriate data
            fill_cat_info(data);

            // creates appropriate selector html
            create_selector_html();

            // insertion area begins - REFACTOR ALL CODE HERE
            cat_data.forEach((cat) => {
                add_cat_to_html(cat);
            });

            $('#type').on('change', () => {
                update_preferences();
            })

            $('#color').on('change', () => {
                update_preferences();
            })

            $('#gender').on('change', () => {
                update_preferences();
            })

            add_btns = document.getElementsByClassName("add-to-cart");
            for(let i = 0; i < add_btns.length; i++) {
                add_btns[i].addEventListener("click", () => {
                    increment_cart();
                })
            }

            //insertion area ends
        }); 

    function fill_cat_info(data) {
        cat_data = data;

        for (i = 0; i < data.length; i++) {
            let cat = data[i];

            if (!cat_types.includes(cat.type)) {
                cat_types.push(cat.type);
            }

            if (!cat_genders.includes(cat.gender)) {
                cat_genders.push(cat.gender);
            }

            for (j = 0; j < cat.color.length; j++) {
                if (!cat_colors.includes(cat.color[j])) {
                    cat_colors.push(cat.color[j]);
                }
            }
        }

        console.log(cat_types + " " + cat_colors + " " + cat_genders);
    }

    //refactor opportunity
    function create_selector_html() {
        let html_type = '<option value="">Select Type</option>';
        let html_color = '<option value="">Select Color</option>';
        let html_gender = '<option value="">Select Gender</option>';

        cat_types.forEach(element => {
            html_type += '<option value="' + element + '">' + element + '</option>';
        });

        cat_colors.forEach(element => {
            html_color += '<option value="' + element + '">' + element + '</option>';
        });

        cat_genders.forEach(element => {
            html_gender += '<option value="' + element + '">' + element + '</option>';
        })

        let type_selector = document.getElementById('type');
        type_selector.innerHTML = html_type;

        let color_selector = document.getElementById('color');
        color_selector.innerHTML = html_color;

        let gender_selector = document.getElementById('gender');
        gender_selector.innerHTML = html_gender;
    }

    function update_preferences() {
        let cat_type = $('#type').val();
        let cat_color = $('#color').val();
        let cat_gender = $('#gender').val();

        $('#cats-container').html('');

        cat_data.forEach((cat, index, array) => {
            if(cat_type == '') {
                add_cat_to_html(cat);
            } else {
                if (cat_data[index].type == cat_type) {
                    console.log(cat.type);
                    add_cat_to_html(cat);
                }
            }
        });
    }

    function add_cat_to_html(cat) {
        $('#cats-container').append(
            '<div class="card d-flex">' +
            '<img src="https://placekitten.com/200/300" alt="placeholder cat picture">' +
            '<div class="cat-details"><h3>' + cat.name + '</h3>' +
            '<h5>' + cat.type + '</h5>' +
            '<h6>' + cat.color + '</h6></div>' +
            '<button type="submit" name="cat-' + cat.id +
            '" class="add-to-cart btn" id="cat-' + cat.id + '">Add to Cart</button>' +
            '</div>'
        );
    }

    function increment_cart() {
        let number = parseInt($('#number-in-cart').html());
        number++;
        console.log(number);
        $('#number-in-cart').html(number);
    }