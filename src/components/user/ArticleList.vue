<template>
	<!-- 主体内容 -->
	<div style="padding:24px;">
		<h1 class="user-header">文章列表
			<small> —— Article List</small>
		</h1>
		<br/>
        <table id="tableArticle" lay-filter="article-table"></table>
        <EditorMDPreview :content="content" ref="preview" v-show="false"></EditorMDPreview>

        <script type="text/html" id="table-toolbar" v-pre>
        <div class="layui-btn-group">
            <a class="layui-btn layui-btn-xs" lay-event="see">预览</a>
            <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="edit">编辑</a>
            {{# if(d.isTop){ }}
            <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="untop">取消置顶</a>
            {{# }else{ }}
            <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="top">置顶</a>
            {{#  } }}

            {{# if(d.isPrivate){ }}
            <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="public">公开</a>
            {{# }else{ }}
            <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="private">私密</a>
            {{#  } }}
            
            <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
        </div>
        </script>
	</div>
</template>


<script>
import MD from 'static/EditorMD/editormd';

export default {
	name: "UserCMD_Index",
	data() {
		return {
            content: "",
            comPreview: "",
        };
	},
	mounted() {
		var Vue = this;

		layui.use(['element', 'layer', 'table', 'form', 'laytpl'], function () {
            Vue.element = layui.element;
            Vue.layer = layui.layer;
            Vue.table = layui.table;
            Vue.form = layui.form;
            Vue.laytpl = layui.laytpl;

            // 表格
            Vue.table.render({
                elem: '#tableArticle'
                , height: 500
                , url: Vue.$http.options.root + 'api/user/article'
                , headers: {Authorization: "Bearer " + Vue.$localStorage.get("token")}
                , page: true
                , cols: [[
                    {field: 'id', title: 'ID', width: 50, fixed: 'left'}
                    , {field: 'title', title: '标题', width: 360}
                    , {title: '栏目', width: 100, templet: (d) => d.userColumn.title}
                    , {title: '点赞', align:'center', width: 60
                        , templet: function (d) {
                            var good = d.goodNumber || 0;
                            var bad = d.badNumber || 0;
                            return good + "/" + bad;
                        }
                    }
                    , {field: 'commentNumber', title: '评论', align:'center', width: 60}
                    , {field: 'clickNumber', title: '点击', align:'center', width: 60}
                    , {
                        field: 'gmtCreate', title: '添加日期', width: 160
                        , templet: function (d) {
                            return new Date(d.gmtCreate * 1000).Format("yyyy-MM-dd hh:mm:ss");
                        }
                    }, {
                        field: 'lastEditTime', title: '最后修改', width: 160
                        , templet: function (d) {
                            let date = d.lastEditTime || d.gmtCreate;
                            return new Date(date * 1000).Format("yyyy-MM-dd hh:mm:ss");
                        }
                    }
                    , {title: '操作', width: 225, toolbar: '#table-toolbar', fixed: 'right'}
                ]],
                request:{
                    limitName: 'size'
                }
            });

            // 表格工具栏响应
            Vue.table.on('tool(article-table)', function (obj) {
                var data = obj.data;
                var layEvent = obj.event;
                var tr = obj.tr;

                if (layEvent === 'see') {

                    var load = Vue.layer.load(1);
                    Vue.$http.get("api/article/content/" + data.id)
                        .then((res) => {
                            Vue.layer.close(load);
                            var result = res.body;

                            Vue.content = result.data;

                            Vue.$refs.preview.modal({
                                type: 1,
                                title: data.title,
                                skin: 'layui-layer-rim',
                                area: ['80%', '520px'],
                            });
                        },
                        (err) => {
                            Vue.layer.close(load);
                            Vue.layer.msg("网络异常");
                        });

                    
                } else if (layEvent === 'del') {
                    layer.confirm("确定删除文章：" + data.title + "吗", function (index) {
                        Vue.$http.delete("api/article/" + data.id)
                            .then((res) => {
                                Vue.layer.close(load);
                                var result = res.body;

                                if(result.success){
                                    Vue.$router.go();
                                }else{
                                    Vue.layer.msg("网络异常");
                                }
                            },
                            (err) => {
                                Vue.layer.close(load);
                                Vue.layer.msg("网络异常");
                            });
                    });
                }
            });
        });
    },
    methods: {
    }
};
</script>

<style scoped>
body {
	background-color: lightblue;
}
</style>
