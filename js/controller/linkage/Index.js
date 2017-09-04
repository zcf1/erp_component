define(['linkage', 'defaults-zh_CN','utils/app','highlight.pack'],
    function () {
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
        function init(select$, render) {

            select$.data("data-nms-init", true);
            // select$.selectpicker('destroy');

            const urltpl = select$.attr("data-nms-src");
            if (!urltpl) {
                select$.attr("multiple", "multiple");
                // select$.addClass("selectpicker");
                select$.selectpicker('deselectAll');
                select$.selectpicker("refresh");
                select$.selectpicker("render");
                // render && select$.selectpicker('show');
                return;
            }

            const values = select$.data("data-nms-values") || "";
            const url = urltpl.replace(/\$values/ig, encodeURIComponent(values));
            console.log(url);
            function ajax(url, callback) {
                callback({
                    data: [
                        { id: "1", name: "a" },
                        { id: "2", name: "b" },
                        { id: "3", name: "c" },
                        { id: "4", name: "d" },
                        { id: "5", name: "e" },
                        { id: "6", name: "f" },
                        { id: "7", name: "g" },
                        { id: "8", name: "h" },
                        { id: "9", name: "i" },
                        { id: "10", name: "j" },
                        { id: "11", name: "k" },
                        { id: "12", name: "l" },
                        { id: "13", name: "m" },
                        { id: "14", name: "n" },
                        { id: "15", name: "o" }
                    ].filter(e => !values || e.id == values)
                });
            };
            ajax(url, data => {
                const options = select$.get(0).options;
                options.length = 0;
                for (let i = 0; i < data.data.length; i++) {
                    const e = data.data[i];
                    options.add(new Option(e.name, e.id));
                }
                select$.attr("multiple", "multiple");
                // select$.addClass("selectpicker");
                select$.selectpicker('deselectAll');
                select$.selectpicker("refresh");
                select$.selectpicker("render");
                // render && select$.selectpicker('show');
            });
        }
        //初始化函数
        $(() => {
            $("[data-nms]").each((i, e) => {
                const select$ = $(e);
                if (select$.data("data-nms-init")) return undefined;
                select$.attr("data-size", "5");
                select$.attr("data-selected-text-format", "count");
                select$.attr("data-live-search", "true");
                select$.attr("data-actions-box", "true");
                init(select$, true);
            })
        });

        $(document).on("mousedown", "[data-nms]", e => {
            const select$ = $(e.currentTarget);
            if (select$.data("data-nms-init")) return undefined;
            init(select$, true);
            return false;
        });

        $(document).on("changed.bs.select", "[data-nms-target]", e => {
            const select$ = $(e.currentTarget);
            const target$ = $(select$.attr("data-nms-target"));
            target$.data("data-nms-values", select$.val());
            init(target$);
        });
    });