document.addEventListener('DOMContentLoaded', function(){
    const editor = EditorJS({
        holder: 'editorjs',
        tools: {
            header:{
                class: Header,
                config: {
                    placeholder: 'Enter a heading/title',
                    levels: [2,3,4],
                    defaultLevel: 3
                }
            },
            list:{
                class: List,
                inlineToolbar: true,
                config: {
                    defaultStyle: 'unordered'
                }
            },
        }
    });
})
    