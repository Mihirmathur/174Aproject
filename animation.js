Declare_Any_Class("Project2", // An example of drawing a hierarchical object using a "model_transform" matrix and post-multiplication.
{
    'construct' (context, canvas = context.canvas) {
        var shapes = {
            "box": new Cube(),
            "square": new Square(),
            "head": new Grid_Sphere(200, 200),
            "round_cyl": new Capped_Cylinder(20, 100)
        };
        this.submit_shapes(context, shapes);
        var model_transform;
        var model_stack = new Array();
        var st = new Array();
        this.define_data_members({
            red: context.shaders_in_use["Phong_Model"].material(Color(1, 0, 0, 1), 1, 0, 0, 100),
            blue: context.shaders_in_use["Phong_Model"].material(Color(0, 0, 1, 1), 1, 0, 0, 100),
            green: context.shaders_in_use["Phong_Model"].material(Color(0, 1, 0, 1), 1, 0, 0, 100),
            brown: context.shaders_in_use["Phong_Model"].material(Color(.7, .3, 0, 1), 1, 0, 0, 100),
            mustard: context.shaders_in_use["Phong_Model"].material(Color(.9, .7, 0, 1), 1, 0, 0, 100),
            blackish: context.shaders_in_use["Phong_Model"].material(Color(.2, .1, .1, 1), 1, 0, 0, 100),
            yellow: context.shaders_in_use["Phong_Model"].material(Color(1, 1, .2, 1), 1, 0, 0, 100),
            purplePlastic: context.shaders_in_use["Phong_Model"].material(Color(.9, .2, .7, 1), .4, .4, .8, 40),
            stars: context.shaders_in_use["Phong_Model"].material(Color(.5, .5, .5, 1), .5, .5, .5, 40, context.textures_in_use["stars.png"]),
            bumps: context.shaders_in_use["Fake_Bump_Map"].material(Color(.5, .5, .5, 1), .5, .5, .5, 40, context.textures_in_use["stars.png"]),
            ironman_face: context.shaders_in_use["Phong_Model"].material(Color(.1, .1, .1, 1), .7, .7, .7, 40, context.textures_in_use["ironman_face.png"]),
            ironman_top: context.shaders_in_use["Phong_Model"].material(Color(.1, .1, .1, 1), .7, .7, .7, 40, context.textures_in_use["ironman_top.png"]),
            ironman_right: context.shaders_in_use["Phong_Model"].material(Color(.1, .1, .1, 1), .7, .7, .7, 40, context.textures_in_use["ironman_right.png"]),
            ironman_left: context.shaders_in_use["Phong_Model"].material(Color(.1, .1, .1, 1), .7, .7, .7, 40, context.textures_in_use["ironman_left.png"]),
            ironman_back: context.shaders_in_use["Phong_Model"].material(Color(.1, .1, .1, 1), .7, .7, .7, 40, context.textures_in_use["ironman_back.png"]),
            ground: context.shaders_in_use["Phong_Model"].material(Color(.1, .1, .1, 1), .7, .7, .7, 40, context.textures_in_use["ground.png"]),

        });
        context.globals.graphics_state.set(translation(0, -10, -60), perspective(45, context.width / context.height, .1, 1000), 0);

        this.textureCube = function(graphics_state, model_transform, front_face, back_face, right_face, left_face, top_face, bottom_face){
            model_stack.push(model_transform);
            model_transform = mult(model_transform, scale(2, 2, 2));
            //Face front   
            this.shapes.square.draw(graphics_state, model_transform, front_face);
            model_transform = mult(model_transform, translation(0,0,-2));
            //Face back
            this.shapes.square.draw(graphics_state, model_transform, back_face);      
            model_transform = mult(model_transform, translation(1,0,1));
            model_transform = mult(model_transform, rotation(90,[0,1,0])); 
            //Face right
            this.shapes.square.draw(graphics_state, model_transform, right_face);
            model_transform = mult(model_transform, translation(0,1,-1));
            model_transform = mult(model_transform, rotation(90,[1,0,0]));
            //Face top 
            this.shapes.square.draw(graphics_state, model_transform, top_face);
            model_transform = mult(model_transform, translation(0,0,2));
            //Face bottom
            this.shapes.square.draw(graphics_state, model_transform, bottom_face);
            model_transform = mult(model_transform, translation(0,-1,-1));
            model_transform = mult(model_transform, rotation(90,[1,0,0]));
            //Face Left
            this.shapes.square.draw(graphics_state, model_transform, left_face);
            model_transform = model_stack.pop();
        }

        this.generateMultiple = function(graphics_state, model_transform, material){
            model_stack.push(model_transform);
            model_transform = mult(model_transform, translation(-100, -40, -150));
            model_transform = mult(model_transform, rotation(90, [1, 0, 0]));
            st.push(model_transform);
            //model_transform = mult(model_transform, scale(10, 10, 10));
            for(var i = 0; i<10; i++){
                model_transform=st.pop();
                st.push(model_transform);          
                model_transform = mult(model_transform, translation(i*20, 0, 0));
                model_transform = mult(model_transform, scale(20, 20, 20));
                for(var j = 0; j<10; j++){
                    model_transform = mult(model_transform, translation(0, 1, 0));
                    this.shapes.square.draw(graphics_state, model_transform, material);
                }
            }
            st.pop();
            model_transform = model_stack.pop();
        }

    },

    

    'display' (graphics_state) {      

        model_transform = identity();

        var t = graphics_state.animation_time / 1800,
        tilt_spin = rotation(700 * t, [.1, .8, .1]),
        funny_orbit = rotation(90 * t, [Math.cos(t), Math.sin(t), .7 * Math.cos(t)]);
        
        model_transform = mult(model_transform, translation(0, -40, -50));
        model_transform = mult(model_transform, rotation(90, [1, 0, 0]));
        model_transform = mult(model_transform, scale(200, 200, 200));
        this.shapes.square.draw(graphics_state, model_transform, this.ground);

        model_transform = identity();

        this.textureCube(graphics_state, model_transform, this.ironman_face, this.ironman_back, this.ironman_right, this.ironman_left, this.ironman_top, this.ironman_back);
        model_transform = mult(model_transform, translation(0, -5, -2));
        model_transform = mult(model_transform, scale(2, 3, 2));
        this.shapes.box.draw(graphics_state, model_transform, this.ironman_back);
        model_transform = mult(model_transform, translation(0, 0, 1.1));
        this.shapes.square.draw(graphics_state, model_transform, this.ironman_face);

    }
}, Scene_Component);