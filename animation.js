//Motion Variables:
var r_arm_angle = 0,
    l_arm_angle = 0;
var r_leg_angle = 0,
    l_leg_angle = 0;
var body_angle = 20;
var motion = [0, 0, 0];

//Controllers
var shoot = 0;
var shoot_distance = 0;
var collision = 0;
var impact = 1;


//Scenes:
var scene1_time = 4;
var scene2_time = 10;
var scene3_time = 14;
var scene4_time = 20;
Declare_Any_Class("Project2", // An example of drawing a hierarchical object using a "model_transform" matrix and post-multiplication.
    {
        'construct' (context, canvas = context.canvas) {
            var shapes = {
                "box": new Cube(),
                "square": new Square(),
                "sphere": new Grid_Sphere(200, 200),
                "round_cyl": new Capped_Cylinder(20, 100),
                "torus": new Torus(100, 100),
                "tetra": new Tetrahedron,
                "pyra": new Pyramid,
            };
            this.submit_shapes(context, shapes);
            var model_transform;
            var model_stack = new Array();
            var st = new Array();
            this.define_data_members({
                graphics_state: context.globals.graphics_state,
                red: context.shaders_in_use["Phong_Model"].material(Color(1, 0, 0, 1), 1, 0, 0, 100),
                blue: context.shaders_in_use["Phong_Model"].material(Color(0, 0, 1, 1), 1, 0, 0, 100),
                green: context.shaders_in_use["Phong_Model"].material(Color(0, 1, 0, 1), 1, 0, 0, 100),
                brown: context.shaders_in_use["Phong_Model"].material(Color(.7, .3, 0, 1), 1, 0, 0, 100),
                mustard: context.shaders_in_use["Phong_Model"].material(Color(.9, .7, 0, 1), 1, 0, 0, 100),
                blackish: context.shaders_in_use["Phong_Model"].material(Color(.2, .1, .1, 1), 1, 0, 0, 100),
                fire: context.shaders_in_use["Funny_Shader"].material(),
                yellow: context.shaders_in_use["Phong_Model"].material(Color(1, 1, .2, 1), 1, 0, 0, 100),
                purplePlastic: context.shaders_in_use["Phong_Model"].material(Color(.9, .2, .7, 1), .4, .4, .8, 40),
                stars: context.shaders_in_use["Phong_Model"].material(Color(.5, .5, .5, 1), .5, .5, .5, 40, context.textures_in_use["stars.png"]),
                bumps: context.shaders_in_use["Fake_Bump_Map"].material(Color(.5, .5, .5, 1), .5, .5, .5, 40, context.textures_in_use["stars.png"]),
                ironman_face: context.shaders_in_use["Phong_Model"].material(Color(.1, .1, .1, 1), .7, .7, .7, 40, context.textures_in_use["ironman_face.png"]),
                ironman_top: context.shaders_in_use["Phong_Model"].material(Color(.1, .1, .1, 1), .7, .7, .7, 40, context.textures_in_use["ironman_top.png"]),
                ironman_right: context.shaders_in_use["Phong_Model"].material(Color(.1, .1, .1, 1), .7, .7, .7, 40, context.textures_in_use["ironman_right.png"]),
                ironman_left: context.shaders_in_use["Phong_Model"].material(Color(.1, .1, .1, 1), .7, .7, .7, 40, context.textures_in_use["ironman_left.png"]),
                ironman_back: context.shaders_in_use["Phong_Model"].material(Color(.1, .1, .1, 1), .7, .7, .7, 40, context.textures_in_use["ironman_back.png"]),
                ironman_suit: context.shaders_in_use["Phong_Model"].material(Color(.1, .1, .1, 1), .7, .7, .7, 40, context.textures_in_use["ironman_suit.png"]),
                ironman_leg: context.shaders_in_use["Phong_Model"].material(Color(.1, .1, .1, 1), .7, .7, .7, 40, context.textures_in_use["ironman_leg.png"]),
                ironman_arm: context.shaders_in_use["Phong_Model"].material(Color(.1, .1, .1, 1), .7, .7, .7, 40, context.textures_in_use["ironman_arm.png"]),
                ground: context.shaders_in_use["Phong_Model"].material(Color(.1, .1, .1, 1), .7, .7, .7, 40, context.textures_in_use["ground.png"]),
                sky: context.shaders_in_use["Phong_Model"].material(Color(.1, .1, .1, 1), .7, .7, .7, 40, context.textures_in_use["sky.png"]),
                blast: context.shaders_in_use["Phong_Model"].material(Color(.1, .1, .1, 1), .7, .7, .7, 40, context.textures_in_use["blast.png"]),

            });
            context.globals.graphics_state.set(translation(0, -10, -60), perspective(45, context.width / context.height, .1, 1000), 0);

            this.textureCube = function(graphics_state, model_transform, front_face, back_face, right_face, left_face, top_face, bottom_face) {
                model_stack.push(model_transform);
                model_transform = mult(model_transform, scale(3, 3, 3));
                //Face front   
                this.shapes.square.draw(graphics_state, model_transform, front_face);
                model_transform = mult(model_transform, translation(0, 0, -2));
                //Face back
                this.shapes.square.draw(graphics_state, model_transform, back_face);
                model_transform = mult(model_transform, translation(1, 0, 1));
                model_transform = mult(model_transform, rotation(90, [0, 1, 0]));
                //Face right
                this.shapes.square.draw(graphics_state, model_transform, right_face);
                model_transform = mult(model_transform, translation(0, 1, -1));
                model_transform = mult(model_transform, rotation(90, [1, 0, 0]));
                //Face top 
                this.shapes.square.draw(graphics_state, model_transform, top_face);
                model_transform = mult(model_transform, translation(0, 0, 2));
                //Face bottom
                this.shapes.square.draw(graphics_state, model_transform, bottom_face);
                model_transform = mult(model_transform, translation(0, -1, -1));
                model_transform = mult(model_transform, rotation(90, [1, 0, 0]));
                //Face Left
                this.shapes.square.draw(graphics_state, model_transform, left_face);
                model_transform = model_stack.pop();
            }

            this.generateMultiple = function(graphics_state, model_transform, material) {
                model_stack.push(model_transform);
                model_transform = mult(model_transform, translation(-100, -40, -150));
                model_transform = mult(model_transform, rotation(90, [1, 0, 0]));
                st.push(model_transform);
                //model_transform = mult(model_transform, scale(10, 10, 10));
                for (var i = 0; i < 10; i++) {
                    model_transform = st.pop();
                    st.push(model_transform);
                    model_transform = mult(model_transform, translation(i * 20, 0, 0));
                    model_transform = mult(model_transform, scale(20, 20, 20));
                    for (var j = 0; j < 10; j++) {
                        model_transform = mult(model_transform, translation(0, 1, 0));
                        this.shapes.square.draw(graphics_state, model_transform, material);
                    }
                }
                st.pop();
                model_transform = model_stack.pop();
            }

            // this.graphics_state.camera_transform = identity();
        },



        'display' (graphics_state) {

            model_transform = identity();
            var model_st = new Array();
            var t = graphics_state.animation_time / 1500,
                tilt_spin = rotation(700 * t, [.1, .8, .1]),
                funny_orbit = rotation(90 * t, [Math.cos(t), Math.sin(t), .7 * Math.cos(t)]);

            model_st.push(model_transform);
            model_transform = mult(model_transform, scale(500, 500, 500));
            this.shapes.box.draw(graphics_state, model_transform, this.sky);
            model_transform = model_st.pop();


            model_st.push(model_transform);
            model_transform = mult(model_transform, translation(0, -40, 0));
            model_transform = mult(model_transform, rotation(90, [1, 0, 0]));
            model_transform = mult(model_transform, scale(200, 200, 200));
            this.shapes.square.draw(graphics_state, model_transform, this.ground);
            model_transform = model_st.pop();


            //Pyramid
            model_st.push(model_transform);
            model_transform = mult(model_transform, translation(0, -30, 80));
            if (collision == 0) {
                model_transform = mult(model_transform, scale(30, 30, 30));
                this.shapes.pyra.draw(graphics_state, model_transform, this.blast);
            } else {
                console.log('Impact!');
                model_transform = mult(model_transform, scale(30/impact, 30/impact, 30/impact));
                this.shapes.pyra.draw(graphics_state, model_transform, this.blast);
                model_transform = mult(model_transform, scale(impact / 15, impact / 15, impact / 15));
                var debris = 10;
                for (var j = 1; j < debris; j++) {
                    var d_ang = (180 / debris) * j;
                    var rand = Math.floor((Math.random() * 4) + 1);
                    var distance = 15*impact;
                    model_transform = mult(model_transform, translation(distance * Math.cos(d_ang), 10, distance * Math.sin(d_ang)));
                    model_transform = mult(model_transform, scale(2, 2, 2));
                    this.shapes.tetra.draw(graphics_state, model_transform, this.blast);
                    model_transform = mult(model_transform, scale(1/2, 1/2, 1/2));
                    model_transform = mult(model_transform, translation(-distance * Math.cos(d_ang), -10, -distance * Math.sin(d_ang)));


                    model_transform = mult(model_transform, translation((distance-4) * Math.cos(d_ang), 5, (distance-4) * Math.sin(d_ang)));
                   
                    this.shapes.sphere.draw(graphics_state, model_transform, this.blast);
                   
                    model_transform = mult(model_transform, translation(-(distance-4) * Math.cos(d_ang), -5, -(distance-4) * Math.sin(d_ang)));


                }
                impact=impact+.2;
            }

            model_transform = model_st.pop();


            //Iron Man
            //model_transform = mult(model_transform, this.graphics_state.camera_transform);
            //Transformations for controlling entire body
            model_transform = mult(model_transform, translation(motion[0], motion[1], motion[2]));

            //Head
            this.textureCube(graphics_state, model_transform, this.ironman_face, this.ironman_back, this.ironman_right, this.ironman_left, this.ironman_top, this.ironman_back);
            model_transform = mult(model_transform, translation(0, 0, -3.5));
            model_transform = mult(model_transform, rotation(body_angle, [1, 0, 0]));
            model_transform = mult(model_transform, translation(0, -6, 0));
            model_transform = mult(model_transform, scale(2, 3, 2));

            //Torso
            this.shapes.box.draw(graphics_state, model_transform, this.ironman_back);
            model_transform = mult(model_transform, translation(0, 0, 1.1));
            this.shapes.square.draw(graphics_state, model_transform, this.ironman_suit);
            model_transform = mult(model_transform, translation(0, 0, -.1));
            model_transform = mult(model_transform, scale(1 / 2, 1 / 3, 1 / 2));

            //Arms
            //Right Arm
            model_st.push(model_transform);
            model_transform = mult(model_transform, translation(3, 1, -1.5));
            model_transform = mult(model_transform, rotation(r_arm_angle, [1, 0, 0]));
            model_transform = mult(model_transform, translation(0, -1, 0));
            model_transform = mult(model_transform, scale(1, 2, 1));
            this.shapes.box.draw(graphics_state, model_transform, this.ironman_arm);
            model_transform = mult(model_transform, scale(1, 1 / 4, 1));
            model_transform = mult(model_transform, translation(0, -5.5, 0));
            this.shapes.box.draw(graphics_state, model_transform, this.yellow);

            if (shoot == 1) {
                var num_balls = 8;
                model_transform = mult(model_transform, scale(1, 2, 1));
                model_transform = mult(model_transform, translation(0, -1 * (shoot_distance * shoot_distance) / 20, 0));
                model_transform = mult(model_transform, rotation(10 * t * t, [0, 1, 0]));
                this.shapes.sphere.draw(graphics_state, model_transform, this.blast);
                //model_transform = mult(model_transform, translation(0,  0, 2));
                for (var j = 1; j < num_balls; j++) {
                    var ball_ang = (180 / num_balls) * j;
                    var rand = Math.floor((Math.random() * 4) + 1);
                    var distance = 2;
                    model_transform = mult(model_transform, translation(distance * Math.cos(ball_ang), 0, distance * Math.sin(ball_ang)));
                    model_transform = mult(model_transform, scale(.5, .5, .5));
                    this.shapes.tetra.draw(graphics_state, model_transform, this.sky);
                    model_transform = mult(model_transform, scale(2, 2, 2));
                    model_transform = mult(model_transform, translation(-distance * Math.cos(ball_ang), 0, -distance * Math.sin(ball_ang)));
                }
                shoot_distance++;
            }

            model_transform = model_st.pop();


            //Left Arm
            model_st.push(model_transform);
            model_transform = mult(model_transform, translation(-6, 0, 0));
            model_transform = mult(model_transform, translation(3, 1, -1.5));
            model_transform = mult(model_transform, rotation(l_arm_angle, [1, 0, 0]));
            model_transform = mult(model_transform, translation(0, -1, 0));
            model_transform = mult(model_transform, scale(1, 2, 1));
            this.shapes.box.draw(graphics_state, model_transform, this.ironman_arm);
            model_transform = mult(model_transform, scale(1, 1 / 4, 1));
            model_transform = mult(model_transform, translation(0, -5.5, 0));
            this.shapes.box.draw(graphics_state, model_transform, this.yellow);
            model_transform = model_st.pop();

            //Right Leg
            model_st.push(model_transform);
            model_transform = mult(model_transform, scale(1, 2, 2));
            model_transform = mult(model_transform, translation(1, -2.5, -1));
            model_transform = mult(model_transform, translation(0, 2.5, 0));
            model_transform = mult(model_transform, rotation(r_leg_angle, [1, 0, 0]));
            model_transform = mult(model_transform, translation(0, -2.5, 0));
            this.shapes.box.draw(graphics_state, model_transform, this.ironman_leg);
            model_transform = mult(model_transform, scale(1, 1 / 2, 1 / 2));
            model_transform = mult(model_transform, rotation(90, [1, 0, 0]));
            model_transform = mult(model_transform, scale(1 / 3, 1 / 3, 1 / 3));
            for (var i = 0; i < 3; i++) {
                model_transform = mult(model_transform, translation(0, 0, 1 + 8 * t % 5));
                this.shapes.torus.draw(graphics_state, model_transform, this.fire);
            }
            model_transform = model_st.pop();

            model_transform = mult(model_transform, translation(-2, 0, 0));

            //Left Leg
            model_st.push(model_transform);
            model_transform = mult(model_transform, scale(1, 2, 2));
            model_transform = mult(model_transform, translation(1, -2.5, -1));
            model_transform = mult(model_transform, translation(0, 2.5, 0));
            model_transform = mult(model_transform, rotation(l_leg_angle, [1, 0, 0]));
            model_transform = mult(model_transform, translation(0, -2.5, 0));
            this.shapes.box.draw(graphics_state, model_transform, this.ironman_leg);
            model_transform = mult(model_transform, scale(1, 1 / 2, 1 / 2));
            model_transform = mult(model_transform, rotation(90, [1, 0, 0]));
            model_transform = mult(model_transform, scale(1 / 3, 1 / 3, 1 / 3));
            for (var i = 0; i < 3; i++) {
                model_transform = mult(model_transform, translation(0, -1, 1 + 8 * t % 5));
                this.shapes.torus.draw(graphics_state, model_transform, this.fire);
            }
            model_transform = model_st.pop();
            // model_transform = mult(model_transform, translation(-2, 0, 0));
            // this.shapes.box.draw(graphics_state, model_transform, this.ironman_leg);


            //Scene 1    
            if (graphics_state.animation_time <= scene1_time * 1000) {
                graphics_state.camera_transform = lookAt(vec3(20 * t, 50 - 10 * t, 80 - 5 * t), vec3(0, 0, 0), vec3(0, 1, 0))
                r_arm_angle = 50 + 20 * Math.cos(2 * t + Math.PI / 2);
                l_arm_angle = 50 + 20 * Math.cos(2 * t + Math.PI / 2);
                r_leg_angle = 10 + 10 * Math.cos(2 * t + Math.PI / 2);
                l_leg_angle = 10 + 10 * Math.cos(2 * t + Math.PI / 2);
                motion = [0, -20 + 3 * (Math.sin(2 * t)), -100 + t * t];
            } else if (graphics_state.animation_time > (scene1_time * 1000) && graphics_state.animation_time <= (scene2_time * 1000)) {
                graphics_state.camera_transform = lookAt(vec3(0, 50 + 5 * t, -250 + 20 * t), vec3(0, 0, 0), vec3(0, 1, 0))
                r_arm_angle = 70;
                l_arm_angle = 70;
                r_leg_angle = 10 + 10 * Math.cos(2 * t + Math.PI / 2);
                l_leg_angle = 10 + 10 * Math.cos(2 * t + Math.PI / 2);
                motion = [0, -20 + 5 * t, -50 + 2 * t * t];
            } else if (graphics_state.animation_time > (scene2_time * 1000) && graphics_state.animation_time <= (scene3_time * 1000)) {
                graphics_state.camera_transform = lookAt(vec3(2 * t, 10 + t, 50), vec3(0, 0, 0), vec3(0, 1, 0))
                if (r_arm_angle > -90) {
                    r_arm_angle = -10 * t;
                } else {
                    shoot = 1;
                }
                l_arm_angle = 0;
                r_leg_angle = 0;
                l_leg_angle = 0;
                body_angle = 0;
                motion = [0, t, -50 + 2 * t];
            } else if (graphics_state.animation_time > (scene3_time * 1000) && graphics_state.animation_time <= (scene4_time * 1000)) {
                if(graphics_state.animation_time > ((scene3_time+1.3) * 1000)){
                    collision = 1;
                    shoot_distance = 1;
                }
                graphics_state.camera_transform = lookAt(vec3(-21 + t, 21 + t, -80), vec3(0, 0, 0), vec3(0, 1, 0))
            }


        }
    }, Scene_Component);
