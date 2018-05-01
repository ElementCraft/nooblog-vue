<template>
	<div id="EditorMD">
		
	</div>
</template>

<script>
import scriptjs from "scriptjs";

export default {
	name: "EditorMD",
	props: {
		editorConfig: {
			type: Object,
			default() {
				return {
					width: "96%",
					height: 800,
					path: "static/EditorMD/lib/",
					//theme: "dark",
					//previewTheme: "dark",
					//editorTheme: "pastel-on-dark",
					codeFold: true,
					//saveHTMLToTextarea: true,    // 保存 HTML 到 Textarea
					searchReplace: true,
					emoji: true,
					taskList: true,
					tex: false, // 开启科学公式TeX语言支持，默认关闭
					flowChart: true, // 开启流程图支持，默认关闭
					sequenceDiagram: true, // 开启时序/序列图支持，默认关闭,
					imageUpload: true,
					imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
					imageUploadURL: "./php/upload.php",
					toolbarIcons: function() {
						return [
							"undo",
							"redo",
							"|",
							"bold",
							"del",
							"italic",
							"quote",
							"|",
							"list-ul",
							"list-ol",
							"hr",
							"|",
							"link",
							"reference-link",
							"image",
							"code",
							"code-block",
							"table",
							"datetime",
							"emoji",
							"html-entities",
							"pagebreak",
							"|",
							"watch",
							"preview",
							"fullscreen",
							"search",
							"|",
							"help",
							"info"
						];
					},
					onfullscreen: function() {
						$("#divBody").css("z-index", "9999");
					},
					onfullscreenExit: function() {
						$("#divBody").css("z-index", "998");
					}
				};
			},
		},
	},
	mounted() {
		// 获取依赖的资源 - 如果需要异步加载的话
		Promise.all([
			//scriptjs('static/jquery.min.js')
		]).then(() => {
			scriptjs('static/EditorMD/editormd.js', () => {
				this.initEditor();
			});
		});
	},
	destoryed() {
		// 解绑全局事件
		// 销毁实例
	},
	methods: {
		initEditor() {
			this.$nextTick((editorMD = window.editormd) => {
				if (editorMD) {
					// Vue 异步执行 DOM 更新，template 里面的 script 标签异步创建
					// 所以，只能在 nextTick 里面初始化 editor.md
					this.instance = editorMD("EditorMD", this.editorConfig);
				}
			});
		}
	}
};
</script>

<style scoped>

</style>
