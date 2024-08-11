class Greaph {
    constructor(index) {
        this.index = index;
        this.row = 0;
        this.column = 0;
        this.canvasSize = 500;
        this.columnNameArray = [];
        this.resultArrary = [];
    }

    paseArray(orginArray) {
        this.resultArrary = [];
        let count = 0;

        for (let i = 0; i < orginArray.length; i++) {
            if (/문항/.test(orginArray[i][0])) {
                this.resultArrary[count] = {
                    name: orginArray[i][1],
                    tag: orginArray[i + 1].map((v, j) => [v, orginArray[i + 2][j]])
                };
                count++;
            }
        }
        this.createGreph();
    }

    createGreph() {
        this.resultArrary.forEach((v, i) => {
            $(".graph_box").append(`<canvas class="canvas"></canvas>`);
            const canvas = $('.canvas')[i];
            const ct = canvas.getContext('2d');
            const colorArray = ['#00ff00', '#0000ff', '#ff0000', '#ffdd66', '#dd66ff', "#ff00ff", "#00ffff"];

            canvas.width = this.canvasSize + 200;
            canvas.height = this.canvasSize;

            let center_x = this.canvasSize / 2 + 100;
            let center_y = this.canvasSize / 2;

            let start = 0;
            let end = 0;

            if (canvas.getContext) {
                let sumNumbers = 0;

                ct.textAlign = "start"
                ct.clearRect(0, 0, this.canvasSize, this.canvasSize);
                ct.font = 'bold 15px/15px Sans-Serif';


                for (let j = 0; j < v["tag"].length; j++) {
                    sumNumbers += v["tag"][j][1] != undefined ? Number(v["tag"][j][1]) : 0;
                }

                for (let j = 0; j < v["tag"].length; j++) {
                    let inputData = v["tag"][j][1] != undefined ? v["tag"][j][1] : 0;
                    end += inputData / sumNumbers * 360;

                    ct.fillStyle = colorArray[j];
                    ct.beginPath();
                    ct.moveTo(center_x, center_y);
                    ct.arc(center_x, center_y, center_y - 50, start * Math.PI / 180, end * Math.PI / 180, false);

                    ct.closePath();
                    ct.fill();

                    ct.fillRect(10, this.canvasSize - 30 - 16 * j, 10, 10);

                    ct.fillStyle = '#000';
                    if ((inputData / sumNumbers * 100).toFixed(2) != 0)
                        ct.fillText((inputData / sumNumbers * 100).toFixed(2) + "%", center_x - 12 + 160 * Math.cos((start + (end - start) / 2) * Math.PI / 180), center_y + 6 + 160 * Math.sin((start + (end - start) / 2) * Math.PI / 180));
                    ct.fillText(v["tag"][j][0], 25, this.canvasSize - 20 - 16 * j);

                    start = end;
                }
                ct.textAlign = "center"

                ct.font = 'bold 20px/15px Sans-Serif';
                ct.fillText(v["name"], center_x, 30);
                ct.fill();
            }
        });

    }
}

(() => {
    const greaph = new Greaph(0);

    const testButton = $(".matrix_box > button");

    testButton.on("click", () => {
        const text = $("textarea");
        aa = text
            .val()
            .split('\n')
            .filter(v => !/^[\s]+$/.test(v))
            .map(v => v.split("\t").filter(v => v != ""))
            .filter(v => v.length !== 0);

        greaph.paseArray(aa);
        // greaph.createContentsBox();
    });
})();