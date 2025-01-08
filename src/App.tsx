import { framer, CanvasNode } from "framer-plugin"
import { useState, useEffect } from "react"
import "./App.css"

framer.showUI({
    position: "top right",
    width: 240,
    height: 120,
})

function useSelection() {
    const [selection, setSelection] = useState<CanvasNode[]>([])

    useEffect(() => {
        const unsubscribe = framer.subscribeToSelection(setSelection)
        return () => unsubscribe()
    }, [])

    return selection
}

export function App() {
    const selection = useSelection()
    const layer = selection.length === 1 ? "layer" : "layers"
    const [newName, setNewName] = useState("")

    const handleRename = async () => {
        for (const node of selection) {
            await node.setAttributes({ name: newName })
        }
    }

    return (
        <main>
            <p>
               You have <span className="text-color-blue">{selection.length}</span> {layer} to be renamed.
            </p>
            <input
            style={{ width: "100%" }}
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New name"
            onKeyDown={(e) => {
                if (e.key === "Enter" || (e.metaKey && e.key === "Enter") || (e.ctrlKey && e.key === "Enter")) {
                handleRename()
                }
            }}
            />
            <button className="framer-button-primary" onClick={handleRename}>
            Rename
            </button>
        </main>
    )
}