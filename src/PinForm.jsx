import { CATEGORIES } from './constants';
import { useState } from 'react';


function PinForm({ place, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [memo, setMemo] = useState('');

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onSave({ title, category, tags, memo });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ background: 'white', padding: 20, borderRadius: 8, width: 320 }}
      >
        <p style={{ margin: '0 0 10px', fontSize: 14, color: '#555' }}>{place.address}</p>

        <label style={{ display: 'block', marginBottom: 10 }}>
          タイトル
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: 6, boxSizing: 'border-box' }}
            required
          />
        </label>

        <label style={{ display: 'block', marginBottom: 10 }}>
          カテゴリ
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '100%', padding: 6, boxSizing: 'border-box' }}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        <label style={{ display: 'block', marginBottom: 4 }}>タグ</label>
        <div style={{ display: 'flex', marginBottom: 6 }}>
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
            style={{ flex: 1, padding: 6 }}
            placeholder="例：世界遺産"
          />
          <button type="button" onClick={handleAddTag} style={{ marginLeft: 6 }}>追加</button>
        </div>
        <div style={{ marginBottom: 10 }}>
          {tags.map((tag) => (
            <span
              key={tag}
              onClick={() => handleRemoveTag(tag)}
              style={{ display: 'inline-block', background: '#eee', padding: '2px 8px', borderRadius: 12, marginRight: 4, marginBottom: 4, cursor: 'pointer', fontSize: 12 }}
            >
              #{tag} ×
            </span>
          ))}
        </div>

        <label style={{ display: 'block', marginBottom: 10 }}>
          メモ（なぜここに立てたか）
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value.slice(0, 500))}
            style={{ width: '100%', padding: 6, boxSizing: 'border-box', height: 80 }}
          />
          <span style={{ fontSize: 12, color: '#888' }}>{memo.length} / 500</span>
        </label>

        <div style={{ textAlign: 'right' }}>
          <button type="button" onClick={onCancel} style={{ marginRight: 8 }}>キャンセル</button>
          <button type="submit">保存</button>
        </div>
      </form>
    </div>
  );
}

export default PinForm;
