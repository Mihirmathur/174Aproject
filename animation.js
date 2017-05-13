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
            this.define_data_members({
                red: context.shaders_in_use["Phong_Model"].material(Color(1, 0, 0, 1), 1, 0, 0, 100),
                blue: context.shaders_in_use["Phong_Model"].material(Color(0, 0, 1, 1), 1, 0, 0, 100),
                green: context.shaders_in_use["Phong_Model"].material(Color(0, 1, 0, 1), 1, 0, 0, 100),
                brown: context.shaders_in_use["Phong_Model"].material(Color(.7, .3, 0, 1), 1, 0, 0, 100),
                mustard: context.shaders_in_use["Phong_Model"].material(Color(.9, .7, 0, 1), 1, 0, 0, 100),
                blackish: context.shaders_in_use["Phong_Model"].material(Color(.2, .1, .1, 1), 1, 0, 0, 100),
                yellow: context.shaders_in_use["Phong_Model"].material(Color(1, 1, .2, 1), 1, 0, 0, 100),
                purplePlastic: context.shaders_in_use["Phong_Model"].material(Color(.9, .2, .7, 1), .4, .4, .8, 40)
            });
            context.globals.graphics_state.set(translation(0, -2, -50), perspective(45, context.width / context.height, .1, 1000), 0);

        },
        'display' (graphics_state) {
            // Assignment 1 can start here!

            var model_stack = new Array();
            var st = new Array();
            model_transform = identity();

            var t = graphics_state.animation_time / 1800,
                tilt_spin = rotation(700 * t, [.1, .8, .1]),
                funny_orbit = rotation(90 * t, [Math.cos(t), Math.sin(t), .7 * Math.cos(t)]);

            
        }
    }, Scene_Component);