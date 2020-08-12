const gulp = require("gulp");
const spritesmith = require("gulp.spritesmith");

function generateSprite() {
    return gulp.src("static/img/sprite/*.png")
        .pipe(spritesmith({
            imgName: '../static/img/sprite.png', //合并后大图的名称
            cssName: '../static/css/sprite.css',
            padding: 2,// 每个图片之间的间距，默认为0px
            cssTemplate: (data) => {
                // data为对象，保存合成前小图和合成打大图的信息包括小图在大图之中的信息
                let arr = [],
                    width = data.spritesheet.px.width,
                    height = data.spritesheet.px.height,
                    url = data.spritesheet.image
                // console.log(data)
                data.sprites.forEach(function (sprite) {
                    arr.push(
                        ".sprite-" + sprite.name +
                        "{" +
                        "display:inline-block;" +
                        "background: url('../img/sprite.png') " +
                        "no-repeat " +
                        sprite.px.offset_x + " " + sprite.px.offset_y + ";" +
                        "background-size: " + width + " " + height + ";" +
                        "width: " + sprite.px.width + ";" +
                        "height: " + sprite.px.height + ";" +
                        "}\n"
                    )
                });
                // return "@fs:108rem;\n"+arr.join("")
                return arr.join("")
            }
        }))
        .pipe(gulp.dest("dest"));
}

gulp.task('sprite', generateSprite);
