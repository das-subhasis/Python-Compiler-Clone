import { Editor, Monaco, MonacoDiffEditor, OnMount } from '@monaco-editor/react'
import React, { useRef, useState } from 'react'
import '../App.css'
import { client } from '../config/config'
import axios from 'axios'

const Code = () => {
    const editorRef = useRef<any | null>(null)
    const [code, setCode] = useState<string | undefined>('')
    const [output, setOutput] = useState<string | undefined>('')

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
    }

    const executeCode = async () => {
        // Here i will fetch the output from the backend
        // Send a POST request to the backend and fetch the output
        const response = await client.post('/compile', {
            code: code,
            la: 'python'
        },
        )
        setOutput(response.data.data)
    }

    return (
        <div className='bg-[#1c1c1c] min-h-[500px] w-full h-[500px] flex items-center rounded-xl overflow-hidden text-white font-firacode'>
            <div className='p-2 w-[65%] h-full'>
                <Editor
                    theme='vs-dark'
                    height={"100%"}
                    width={"100%"}
                    defaultLanguage='python'
                    defaultValue='# Enter code here'
                    onMount={handleEditorDidMount}
                    onChange={(e) => setCode(e)}
                />
            </div>
            <div className='p-2 w-[35%] flex flex-col h-full gap-2'>
                {/* command palette */}
                <div className='h-10 space-x-5'>
                    <button
                        className='px-4 py-1 bg-green-500 rounded-sm text-black font-semibold'
                        onClick={executeCode}
                    >Run</button>
                    <button
                        className='px-4 py-1 bg-green-500 rounded-sm text-black font-semibold'
                        onClick={() => setOutput("")}
                    >Reset</button>
                </div>
                <div className='flex-1 h-full flex flex-col gap-2 '>
                    <span className=''>Output:</span>
                    <div className='flex-1 text-xs overflow-y-scroll whitespace-pre-line'>
                        {
                            output && output
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Code