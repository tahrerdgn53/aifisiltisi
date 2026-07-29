import React, { useEffect, useState } from 'react';
import { Check, Plus, Save, X } from 'lucide-react';
import { AITool } from '../types';

interface EditToolPanelProps {
  tool: AITool;
  onUpdateTool: (tool: AITool) => void | Promise<void>;
  onClose: () => void;
}

export default function EditToolPanel({
  tool,
  onUpdateTool,
  onClose
}: EditToolPanelProps) {
  const [editorReview, setEditorReview] = useState('');
  const [targetAudience, setTargetAudience] = useState<string[]>([]);
  const [useCases, setUseCases] = useState<string[]>([]);
  const [pros, setPros] = useState<string[]>([]);
  const [cons, setCons] = useState<string[]>([]);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  const [targetAudienceInput, setTargetAudienceInput] = useState('');
  const [useCaseInput, setUseCaseInput] = useState('');
  const [proInput, setProInput] = useState('');
  const [conInput, setConInput] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    setEditorReview(tool.editorReview || '');
    setTargetAudience(tool.targetAudience || []);
    setUseCases(tool.useCases || []);
    setPros(tool.pros || []);
    setCons(tool.cons || []);
    setSeoTitle(tool.seoTitle || '');
    setSeoDescription(tool.seoDescription || '');

    setTargetAudienceInput('');
    setUseCaseInput('');
    setProInput('');
    setConInput('');
    setSaveMessage('');
  }, [tool]);

  const addListItem = (
    value: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    clearInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const cleanedValue = value.trim();

    if (!cleanedValue) {
      return;
    }

    const alreadyExists = list.some(
      (item) => item.toLocaleLowerCase('tr-TR') === cleanedValue.toLocaleLowerCase('tr-TR')
    );

    if (alreadyExists) {
      clearInput('');
      return;
    }

    setList((currentList) => [...currentList, cleanedValue]);
    clearInput('');
  };

  const removeListItem = (
    index: number,
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList((currentList) =>
      currentList.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setSaveMessage('');

      const updatedTool: AITool = {
        ...tool,
        editorReview: editorReview.trim(),
        targetAudience,
        useCases,
        pros,
        cons,
        seoTitle: seoTitle.trim(),
        seoDescription: seoDescription.trim()
      };

      await onUpdateTool(updatedTool);

      setSaveMessage('Değişiklikler başarıyla kaydedildi.');

      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    } catch (error) {
      console.error('Tool editing error:', error);
      setSaveMessage('Değişiklikler kaydedilirken bir hata oluştu.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    value: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    clearInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addListItem(value, list, setList, clearInput);
    }
  };

  const renderListEditor = (
    title: string,
    description: string,
    inputValue: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-bold text-slate-200">
          {title}
        </label>

        <p className="mt-1 text-[10px] leading-relaxed text-slate-500">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={(event) =>
            handleInputKeyDown(
              event,
              inputValue,
              list,
              setList,
              setInputValue
            )
          }
          placeholder="Yeni madde yazın..."
          className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#080c15] px-4 py-3 text-xs text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-cyan-500/50"
        />

        <button
          type="button"
          onClick={() =>
            addListItem(
              inputValue,
              list,
              setList,
              setInputValue
            )
          }
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-400 transition hover:bg-cyan-500/20"
          title="Madde ekle"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {list.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {list.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] text-slate-300"
            >
              <Check className="h-3.5 w-3.5 flex-shrink-0 text-cyan-400" />

              <span>{item}</span>

              <button
                type="button"
                onClick={() => removeListItem(index, setList)}
                className="text-slate-500 transition hover:text-rose-400"
                title="Maddeyi kaldır"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[10px] italic text-slate-600">
          Henüz madde eklenmedi.
        </p>
      )}
    </div>
  );

  return (
    <div className="mt-3 overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#050a13] shadow-2xl shadow-cyan-950/10">
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
        <div>
          <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-cyan-400">
            Araç düzenleme paneli
          </span>

          <h4 className="mt-1 text-sm font-black text-white">
            {tool.name}
          </h4>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
          title="Paneli kapat"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-7 p-5 sm:p-6">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-200">
            Editör Yorumu
          </label>

          <p className="text-[10px] leading-relaxed text-slate-500">
            Araç hakkındaki özgün değerlendirmenizi, güçlü ve zayıf yönleriyle birlikte yazın.
          </p>

          <textarea
            value={editorReview}
            onChange={(event) => setEditorReview(event.target.value)}
            rows={7}
            placeholder="Bu araç hakkındaki editör değerlendirmesini yazın..."
            className="w-full resize-y rounded-xl border border-white/10 bg-[#080c15] px-4 py-3 text-xs leading-relaxed text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-cyan-500/50"
          />
        </div>

        {renderListEditor(
          'Kimler İçin Uygun?',
          'Bu aracı kullanabilecek hedef kullanıcı gruplarını ayrı ayrı ekleyin.',
          targetAudienceInput,
          setTargetAudienceInput,
          targetAudience,
          setTargetAudience
        )}

        {renderListEditor(
          'Kullanım Alanları',
          'Aracın hangi işlerde ve senaryolarda kullanılabileceğini ekleyin.',
          useCaseInput,
          setUseCaseInput,
          useCases,
          setUseCases
        )}

        {renderListEditor(
          'Avantajlar',
          'Aracın öne çıkan olumlu özelliklerini ayrı maddeler halinde ekleyin.',
          proInput,
          setProInput,
          pros,
          setPros
        )}

        {renderListEditor(
          'Dezavantajlar',
          'Aracın sınırlamalarını ve geliştirilmesi gereken yönlerini ekleyin.',
          conInput,
          setConInput,
          cons,
          setCons
        )}

        <div className="grid grid-cols-1 gap-5 border-t border-white/5 pt-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-200">
              SEO Başlığı
            </label>

            <input
              type="text"
              value={seoTitle}
              onChange={(event) => setSeoTitle(event.target.value)}
              placeholder={`${tool.name} Nedir? Özellikleri ve Kullanım Alanları`}
              className="w-full rounded-xl border border-white/10 bg-[#080c15] px-4 py-3 text-xs text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-cyan-500/50"
            />

            <div className="flex justify-end">
              <span
                className={`text-[9px] font-mono ${
                  seoTitle.length > 60
                    ? 'text-orange-400'
                    : 'text-slate-600'
                }`}
              >
                {seoTitle.length}/60
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-200">
              SEO Açıklaması
            </label>

            <textarea
              value={seoDescription}
              onChange={(event) => setSeoDescription(event.target.value)}
              rows={4}
              placeholder="Arama sonuçlarında gösterilecek kısa açıklamayı yazın..."
              className="w-full resize-y rounded-xl border border-white/10 bg-[#080c15] px-4 py-3 text-xs leading-relaxed text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-cyan-500/50"
            />

            <div className="flex justify-end">
              <span
                className={`text-[9px] font-mono ${
                  seoDescription.length > 160
                    ? 'text-orange-400'
                    : 'text-slate-600'
                }`}
              >
                {seoDescription.length}/160
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-white/5 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {saveMessage && (
              <p
                className={`text-[11px] font-bold ${
                  saveMessage.includes('başarıyla')
                    ? 'text-emerald-400'
                    : 'text-rose-400'
                }`}
              >
                {saveMessage}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-xs font-bold text-slate-400 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
            >
              Vazgeç
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-3 text-xs font-black text-white shadow-lg shadow-cyan-500/10 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
            >
              <Save className="h-4 w-4" />

              <span>
                {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
