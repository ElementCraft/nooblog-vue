<template>
	<!-- 主体内容 -->
	<div style="padding:24px;">
		<h1 class="user-header">新增文章
			<small> —— New Article</small>
		</h1>
		<br/>
		<div>
			<form class="layui-form">
				<div class="layui-form-item">
					<label class="layui-form-label">文章标题</label>
					<div class="layui-input-block">
						<input type="text" name="title" required="required" lay-verify="required" placeholder="请输入文章标题" autocomplete="off" class="layui-input"
						/>
					</div>
				</div>
				<div class="layui-form-item">
					<input id="inputColumnHidden" type="hidden" name="columnId" />
					<label class="layui-form-label">文章栏目</label>
					<div class="layui-input-inline">
						<select id="selectColumn1" lay-filter="selectColumn1">
							<option value="">默认栏目</option>
                            <option v-for="col in col1" :key="col.id" :value="col.id">{{col.title}}</option>
						</select>
					</div>
					<div class="layui-input-inline">
						<select data-active="0" id="selectColumn2" lay-filter="selectColumn2">
							<option value="">无</option>
                            <option v-for="col in col2" :key="col.id" :value="col.id">{{col.title}}</option>
						</select>
					</div>
					<div class="layui-input-inline">
						<a @click.prevent="btnAddColumn" class="layui-btn">新增栏目</a>
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">文章类型</label>
					<div class="layui-input-inline">
						<select id="selectTypeFlag" name="typeFlag" lay-filter="selectTypeFlag">
							<option value="1">原创</option>
							<option value="2">转载</option>
							<option value="3">翻译</option>
						</select>
					</div>
				</div>
				<div id="divReprintUrl" class="layui-form-item">
					<label class="layui-form-label">转载自</label>
					<div class="layui-input-block">
						<input type="text" name="reprintUrl" placeholder="请输入转载文章原文地址或出处..." autocomplete="off" class="layui-input" />
					</div>
				</div>
				<div id="divTranslateUrl" class="layui-form-item">
					<label class="layui-form-label">翻译自</label>
					<div class="layui-input-block">
						<input type="text" name="translateUrl" placeholder="请输入翻译文章原文地址或出处..." autocomplete="off" class="layui-input" />
					</div>
				</div>
				<div class="layui-form-item">
					<input id="inputLabelHidden" type="hidden" name="label" />
					<div class="layui-inline">
						<label class="layui-form-label">文章标签</label>
						<div class="layui-input-inline">
							<input id="inputLabel" type="text" placeholder="输入标签名称..." autocomplete="off" class="layui-input" />
						</div>
						<div class="layui-input-inline" style="width:52px;">
							<a @click.prevent="btnAddLabel" class="layui-btn">＋</a>
						</div>
					</div>
					<div class="layui-inline">
						<div id="boxLabel" class="layui-btn-container">
                            <a v-for="(label, index) in labels" :key="index" @click.prevent="btnDeleteLabel(label)" style="margin-bottom:0px;" class="layui-btn layui-bg-blue" :data-label="label">{{label}} X</a>
						</div>
					</div>
				</div>
				<div class="layui-form-item">

					<div class="layui-inline">
						<label class="layui-form-label">私密</label>
						<div class="layui-input-inline">
							<input type="checkbox" value="true" name="isPrivate" lay-skin="switch" lay-text="开|关" />
						</div>
					</div>

					<div class="layui-inline">
						<label class="layui-form-label">置顶</label>
						<div class="layui-input-inline">
							<input type="checkbox" value="true" name="isTop" lay-skin="switch" lay-text="开|关" />
						</div>
					</div>

				</div>

				<div class="layui-form-item">
					<div class="layui-input-block">
						<button class="layui-btn" lay-submit="" lay-filter="formNewArticle">确认保存</button>
					</div>
				</div>

				<div class="layui-form-item">
					<EditorMD></EditorMD>
				</div>

			</form>
		</div>
		<script type="text/html" id="modal-add-column">
			<br/>
			<br/>
			<div>
				<form class="layui-form">
					<div class="layui-form-item">
						<label class="layui-form-label">栏目名称</label>
						<div class="layui-input-inline">
							<input id="inputColumnTitle" type="text" name="title" required="required" lay-verify="required" placeholder="请输入栏目名称" autocomplete="off" class="layui-input"/>
						</div>
						<div class="layui-form-mid layui-word-aux">限定长度1-16</div>
					</div>
					<div class="layui-form-item">
						<label class="layui-form-label">所属栏目</label>
						<div class="layui-input-inline">
							<select id="selectParentColumn" name="parentId" lay-filter="selectParentColumn">

							</select>
						</div>
						<div class="layui-form-mid layui-word-aux">新增二级栏目才需要选择此项</div>
					</div>
					<br/>
					<br/>
					<div class="layui-form-item">
						<div class="layui-input-block">
							<button class="layui-btn" lay-submit="" lay-filter="formAddColumn">新增栏目</button>
							<button type="reset" class="layui-btn layui-btn-primary">重置</button>
						</div>
					</div>
				</form>
			</div>
		</script>
	</div>
</template>


<script>
import EditorMD from 'static/EditorMD/editormd';

export default {
	name: "UserCMD_Index",
	data() {
		return {
            col1:[{id:123, title:"abc"}],
            col2:[],
            labels:[],
        };
	},
	mounted() {
		var Vue = this;

		layui.use(['element', 'layer', 'form'], function () {
            Vue.element = layui.element;
            Vue.layer = layui.layer;
            Vue.form = layui.form;
            
            Vue.form.render();

            var selectColumn1 = $("#selectColumn1");
            var selectColumn2 = $("#selectColumn2");
            var inputColumnHidden = $("#inputColumnHidden");

            // 初始化隐藏
            $("#divReprintUrl").hide();
            $("#divTranslateUrl").hide();
            selectColumn2.parent().hide();

            var load = Vue.layer.load(1);
            // 初始化一级栏目
            Vue.$http.get("api/user/col1")
                .then((res) => {
                    Vue.layer.close(load);

                    var result = res.body;
                    Vue.col1 = result;
                    
                    Vue.$nextTick(function(){
                        Vue.form.render('select');
                    });
                    
                },
                (err) => {
                    Vue.layer.close(load);
                    Vue.layer.msg("网络异常");
                });

            // 文章类型选择框改变选项
            Vue.form.on('select(selectTypeFlag)', function (data) {
                var v = data.value;
                if (v == 1) {
                    $("#divReprintUrl").hide();
                    $("#divTranslateUrl").hide();
                } else if (v == 2) {
                    $("#divReprintUrl").show();
                    $("#divTranslateUrl").hide();
                } else if (v == 3) {
                    $("#divReprintUrl").hide();
                    $("#divTranslateUrl").show();
                }
            });

            // 一级栏目选择框改变
            Vue.form.on('select(selectColumn1)', function (data) {
                var v = data.value;

                if (!v || v == null || v == undefined || v == "") {
                    selectColumn2.data("active", "0");
                    selectColumn2.parent().hide();
                    inputColumnHidden.val("");
                    return false;
                }

                inputColumnHidden.val(v);

                Vue.$http.get("api/user/col2?id=" + v)
                    .then((res) => {
                        let result = res.body;

                        if (!result || result.length == 0) {
                            selectColumn2.data("active", "0");
                            selectColumn2.parent().hide();
                        } else {
                            selectColumn2.data("active", "1");
                            selectColumn2.parent().show();
                            Vue.col2 = result;
                            Vue.$nextTick(() => {
                                Vue.form.render('select');
                            });
                        }
                        
                        return false;
                    },
                    (err) => {
                        Vue.layer.close(load);
                        Vue.layer.msg("网络异常");
                    });
            });

            // 二级栏目选择框改变
            Vue.form.on('select(selectColumn2)', function (data) {
                var v = data.value;

                if (!v || v == null || v == undefined || v == "") {
                    inputColumnHidden.val(selectColumn1.val());
                    return false;
                }

                inputColumnHidden.val(v);
            });

            // 新增文章表单提交
            Vue.form.on('submit(formNewArticle)', function (data) {
                

                data.field["userColumn"] = !data.field["columnId"] ? null : {
                    id: data.field["columnId"]
                };

                data.field["content"] = data.field["EditorMD-markdown-doc"];

                var load = layer.load(1);
                Vue.$http.post("api/article", data.field)
                    .then((res) => {
                        let result = res.body;

                        layer.close(load);
                        if (result.success) {
                            //window.location.href = "/user/article_list";
                            layer.msg(result.msg);
                        } else {
                            layer.msg(result.msg);
                        }
                        
                        return false;
                    },
                    (err) => {
                        Vue.layer.close(load);
                        Vue.layer.msg("网络异常");
                    });

                return false;
            });

            // 新增栏目表单提交
            Vue.form.on('submit(formAddColumn)', function (data) {
                var load = Vue.layer.load(1);
                Vue.$http.post("api/user/column", data.field)
                    .then((res) => {
                        var result = res.body;
                        console.log(result);
                        Vue.layer.close(load);
                        if(result.success){
                            Vue.layer.msg(result.msg);
                        }else{
                            Vue.layer.msg(result.msg);
                        }
                    },
                    (err) => {
                        Vue.layer.close(load);
                        Vue.layer.msg("网络异常");
                    });

                return false;
            });
        });
    },
    methods: {
        btnAddColumn: function(e){
            var modalAddColumn = $("#modal-add-column");

            this.idxModalAddColumn = this.layer.open({
                type: 1,
                title: "新增栏目",
                skin: 'layui-layer-rim',
                area: ['550px', '300px'],
                content: modalAddColumn.html()
            });

            $("#selectParentColumn").append($("#selectColumn1").html());
            this.form.render('select');
        },
        btnAddLabel: function(e){
            var inputLabel = $("#inputLabel");
            var boxLabel = $("#boxLabel");

            var str = inputLabel.val();

            if (str) {
                str = str.trim();

                if (str.length > 64 || str.length == 0) {
                    this.layer.msg("标签文本长度限定1-64个字符");
                    return;
                }

                if(this.labels.indexOf(str) < 0){
                    this.labels.push(str);
                    this.updateLabelHidden();
                }

                inputLabel.val("");
            }
        },
        btnDeleteLabel: function(label){
            this.labels.splice(this.labels.indexOf(label), 1);
            this.updateLabelHidden();
        },
        updateLabelHidden: function () {
            var boxLabel = $("#boxLabel").children();
            var str = "";
            $.each(boxLabel, function (i, obj) {
                str += $(obj).data("label") + ";;";
            });

            $("#inputLabelHidden").val(str);
        }
    }
};
</script>

<style scoped>
body {
	background-color: lightblue;
}
</style>
