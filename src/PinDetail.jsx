import { useState } from 'react';
import { CATEGORIES } from './constants';

function PinDetail({ pin, onSave, onClose }) {
  const [title, setTitle] = useState(pin.title || '');
  const [category, setCategory] = useState(pin.category || CATEGORIES[0]);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(pin.tags || []);
  const [memo, setMemo] = useState(pin.memo || '');

  const [visited, setVisited] = useState(pin.visited || false);
  const [visitDate, setVisitDate] = useState(pin.visitDate || '');
  const [review, setReview] = useState(pin.review || '');

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
    onSave({ title, category, tags, memo, visited, visitDate, review });
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
        style={{ background: 'white', padding: 20, borderRadius: 8, width: 600, maxWidth: '90vw' }}
      >
        <p style={{ fontSize: 13, color: '#888', margin: '0 0 16px' }}>{pin.address}</p>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 16 }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <p style={{ fontWeight: 'bold', fontSize: 13, margin: '0 0 8px', color: '#333' }}>
              訪問前の情報
            </p>

            <label style={{ display: 'block', marginBottom: 8 }}>
              タイトル
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: 6, boxSizing: 'border-box' }}
              />
            </label>

            <label style={{ display: 'block', marginBottom: 8 }}>
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
            <div style={{ marginBottom: 8 }}>
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

            <label style={{ display: 'block' }}>
              探索メモ
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value.slice(0, 500))}
                style={{ width: '100%', padding: 6, boxSizing: 'border-box', height: 80 }}
              />
            </label>
          </div>

          <div style={{ flex: 1, minWidth: 240, borderLeft: '1px solid #eee', paddingLeft: 20 }}>
            <p style={{ fontWeight: 'bold', fontSize: 13, margin: '0 0 8px', color: '#333' }}>
              訪問後の記録
            </p>

            <label style={{ display: 'block', marginBottom: 8 }}>
              <input
                type="checkbox"
                checked={visited}
                onChange={(e) => setVisited(e.target.checked)}
              />
              {' '}訪問済み
            </label>

            <label style={{ display: 'block', marginBottom: 8 }}>
              訪問日
              <input
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                style={{ width: '100%', padding: 6, boxSizing: 'border-box' }}
              />
            </label>

            <label style={{ display: 'block' }}>
              感想メモ
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value.slice(0, 500))}
                style={{ width: '100%', padding: 6, boxSizing: 'border-box', height: 80 }}
                placeholder="訪れてみた感想を書いてください"
              />
            </label>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <button type="button" onClick={onClose} style={{ marginRight: 8 }}>閉じる</button>
          <button type="submit">保存</button>
        </div>
      </form>
    </div>
  );
}

export default PinDetail;
