<template>
	<div id="EditorMDPreview">
		
	</div>
</template>

<script>
import scriptjs from "scriptjs";

export default {
	name: "EditorMDPreview",
	props: {
		content: "",
		editorConfig: {
			type: Object,
			default() {
				return {
					//htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
					htmlDecode      : "style,script,iframe",  // you can filter tags decode
					//toc             : false,
					tocm            : true,    // Using [TOCM]
					//tocContainer    : "#custom-toc-container", // 自定义 ToC 容器层
					//gfm             : false,
					//tocDropdown     : true,
					// markdownSourceCode : true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
					emoji           : true,
					taskList        : true,
					tex             : true,  // 默认不解析
					flowChart       : true,  // 默认不解析
					sequenceDiagram : true,  // 默认不解析
				};
			},
		},
	},
	mounted() {
		// 获取依赖的资源 - 如果需要异步加载的话
		Promise.all([
			scriptjs('static/EditorMD/lib/marked.min.js'),
			scriptjs('static/EditorMD/lib/prettify.min.js'),
			scriptjs('static/EditorMD/lib/raphael.min.js'),
			scriptjs('static/EditorMD/lib/underscore.min.js'),
			scriptjs('static/EditorMD/lib/sequence-diagram.min.js'),
			scriptjs('static/EditorMD/lib/flowchart.min.js'),
			scriptjs('static/EditorMD/lib/jquery.flowchart.min.js'),
		]).then(() => {
			scriptjs('static/EditorMD/editormd.js', () => {
				
			});
		});
	},
	destoryed() {
		
	},
	methods: {
		update(callback){
			var Vue = this;
			this.$nextTick((editorMD = window.editormd) => {
				if (editorMD) {
					let cfg = Vue.editorConfig;
					cfg.markdown = Vue.content;

					$("#EditorMDPreview").prop('outerHTML','<div id="EditorMDPreview"></div>');

					Vue.previewInstance = editorMD.markdownToHTML("EditorMDPreview", cfg);

					if(callback) callback();
				}
			});
		},
		modal(config){
			var Vue = this;
			this.update(function(){
				layui.use(['layer'], function () {
					config.content = $("#EditorMDPreview").prop('outerHTML');
					Vue.previewInstance.hide();
					layer.open(config);
				});
			});
		}
	}
};
</script>

<style>
#EditorMDPreview{
	width: 90%;
}
</style>
