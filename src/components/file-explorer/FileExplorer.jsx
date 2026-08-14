/**
 * FileExplorer.jsx
 * VS Code-style file explorer sidebar for imported projects.
 */
import { useState } from 'react';
import { Folder, FolderOpen, FileCode, FileText, Image, FileJson, File } from 'lucide-react';

const getFileIcon = (ext) => {
  switch (ext) {
    case 'html': return <FileCode size={14} className="explorer-icon html" />;
    case 'css':  return <FileText size={14} className="explorer-icon css" />;
    case 'js':   return <FileCode size={14} className="explorer-icon js" />;
    case 'json': return <FileJson size={14} className="explorer-icon json" />;
    case 'png': case 'jpg': case 'jpeg': case 'svg': case 'gif': case 'webp':
      return <Image size={14} className="explorer-icon img" />;
    default:     return <File size={14} className="explorer-icon" />;
  }
};

function TreeNode({ name, node, depth = 0, onSelectFile, selectedPath }) {
  const [expanded, setExpanded] = useState(depth === 0);
  const isDir = node.type === 'directory';
  const isSelected = !isDir && node.path === selectedPath;

  const handleClick = () => {
    if (isDir) setExpanded((v) => !v);
    else onSelectFile(node);
  };

  return (
    <div className="explorer-node-wrapper">
      <div
        className={`explorer-node ${isDir ? 'dir' : 'file'} ${isSelected ? 'selected' : ''}`}
        style={{ paddingLeft: `${8 + depth * 14}px` }}
        onClick={handleClick}
        title={node.path || name}
      >
        <span className="explorer-node-icon">
          {isDir
            ? (expanded ? <FolderOpen size={14} className="explorer-icon folder" /> : <Folder size={14} className="explorer-icon folder" />)
            : getFileIcon(node.ext)}
        </span>
        <span className="explorer-node-name">{name}</span>
      </div>
      {isDir && expanded && node.children && (
        <div className="explorer-node-children">
          {Object.entries(node.children)
            .sort(([, a], [, b]) => {
              // Directories first, then files
              if (a.type === 'directory' && b.type !== 'directory') return -1;
              if (a.type !== 'directory' && b.type === 'directory') return 1;
              return 0;
            })
            .map(([childName, childNode]) => (
              <TreeNode
                key={childName}
                name={childName}
                node={childNode}
                depth={depth + 1}
                onSelectFile={onSelectFile}
                selectedPath={selectedPath}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default function FileExplorer({ fileTree, onSelectFile, onClose }) {
  const [selectedPath, setSelectedPath] = useState(null);

  const handleSelect = (node) => {
    setSelectedPath(node.path);
    onSelectFile(node);
  };

  if (!fileTree) return null;

  return (
    <aside className="file-explorer">
      <div className="file-explorer-header">
        <span className="file-explorer-title">EXPLORER</span>
        <button className="file-explorer-close" onClick={onClose} title="Close explorer">✕</button>
      </div>
      <div className="file-explorer-body">
        {Object.entries(fileTree)
          .sort(([, a], [, b]) => {
            if (a.type === 'directory' && b.type !== 'directory') return -1;
            if (a.type !== 'directory' && b.type === 'directory') return 1;
            return 0;
          })
          .map(([name, node]) => (
            <TreeNode
              key={name}
              name={name}
              node={node}
              depth={0}
              onSelectFile={handleSelect}
              selectedPath={selectedPath}
            />
          ))}
      </div>
    </aside>
  );
}
