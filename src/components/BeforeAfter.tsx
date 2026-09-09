import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { comparisonCategories, type ComparisonCategory } from '@/data/comparisons';
import './comparison.css';

type DocumentVersion = 'before' | 'after';
type ViewMode = 'all' | DocumentVersion;
type IconName = 'document' | 'check' | 'expand' | 'close' | 'columns';

function ComparisonIcon({ name }: { name: IconName }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {name === 'document' && <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6M8 13h8M8 17h5" /></>}
      {name === 'check' && <path d="m5 12 4 4L19 6" />}
      {name === 'expand' && <path d="M8 3H3v5M16 21h5v-5M3 3l6 6M21 21l-6-6" />}
      {name === 'close' && <path d="m6 6 12 12M6 18 18 6" />}
      {name === 'columns' && <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M12 4v16" /></>}
    </svg>
  );
}

function FormattedText({ text }: { text: string }) {
  return text.split(/(\[SUP\d+\]|\*[^*]+\*)/g).map((part, index) => {
    const superscript = part.match(/^\[SUP(\d+)\]$/);
    if (superscript) return <sup key={index}>{superscript[1]}</sup>;
    if (part.startsWith('*') && part.endsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>;
    return part;
  });
}

function DocumentPaper({ category, version }: { category: ComparisonCategory; version: DocumentVersion }) {
  const data = category[version];
  const footnotes = data.bodyContent.filter((item) => item.type === 'footnote');

  return (
    <div className="comparison-paper-size">
      <article className={`comparison-paper paper-${version} paper-${category.id}`} aria-label={`Contoh dokumen ${version === 'before' ? 'sebelum' : 'sesudah'} dirapikan`}>
        {data.pageHeader && <span className="paper-number paper-number-top">{data.pageHeader}</span>}
        <div className="paper-content">
          <h4 className={`paper-heading heading-${data.headingStyle || 'section'}`}>{data.subheading}</h4>
          {data.bodyContent.map((item, index) => {
            if (item.type === 'paragraph' && item.text) return <p className="paper-paragraph" key={index}><FormattedText text={item.text} /></p>;
            if (item.type === 'subheading' && item.text) return <h5 className="paper-subheading" key={index}>{item.text}</h5>;
            if ((item.type === 'list' || item.type === 'multilevel') && item.items) {
              return (
                <ul className={`paper-list paper-list-${item.type}`} key={index}>
                  {item.items.map((text, itemIndex) => <li className={text.startsWith('   ') ? 'paper-sublevel' : ''} key={itemIndex}>{text.trim()}</li>)}
                </ul>
              );
            }
            return null;
          })}
        </div>
        {footnotes.length > 0 && (
          <aside className="paper-footnotes" aria-label="Catatan kaki">
            {footnotes.flatMap((item) => item.notes || []).map((note, index) => <p key={index}><FormattedText text={note} /></p>)}
          </aside>
        )}
        {data.pageFooter && <span className="paper-number paper-number-bottom">{data.pageFooter}</span>}
      </article>
    </div>
  );
}

export default function BeforeAfter({ standalone = false }: { standalone?: boolean }) {
  const [activeTabId, setActiveTabId] = useState<ComparisonCategory['id']>('footnote');
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [expandedDocument, setExpandedDocument] = useState<DocumentVersion | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const id = useId();
  const currentCategory = comparisonCategories.find((category) => category.id === activeTabId) || comparisonCategories[0];
  const versions: DocumentVersion[] = viewMode === 'all' ? ['before', 'after'] : [viewMode];
  const Heading = standalone ? 'h1' : 'h2';

  useEffect(() => {
    if (!expandedDocument) return;
    const reader = dialog.current;
    const previousOverflow = document.body.style.overflow;
    reader?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      reader?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [expandedDocument]);

  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % comparisonCategories.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + comparisonCategories.length) % comparisonCategories.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = comparisonCategories.length - 1;
    else return;
    event.preventDefault();
    setActiveTabId(comparisonCategories[nextIndex].id);
    tabs.current[nextIndex]?.focus();
  }

  return (
    <section className="comparison-section" id="perbandingan" aria-labelledby={`${id}-title`}>
      <div className="container">
        <header className="comparison-intro">
          <div>
            <span className="comparison-eyebrow"><span /> LIHAT HASILNYA</span>
            <Heading id={`${id}-title`} className="comparison-headline">Naskah yang sama.<br /><span>Tampilan lebih tertata.</span></Heading>
          </div>
          <p className="comparison-description">Dari catatan kaki sampai jarak antarparagraf. Lihat bagaimana detail kecil membuat naskah lebih nyaman dibaca.</p>
        </header>

        <div className="comparison-category-tabs" role="tablist" aria-label="Pilih detail format dokumen">
          {comparisonCategories.map((category, index) => (
            <button key={category.id} ref={(element) => { tabs.current[index] = element; }} id={`${id}-tab-${category.id}`} type="button" role="tab" aria-selected={activeTabId === category.id} aria-controls={`${id}-panel`} tabIndex={activeTabId === category.id ? 0 : -1} className={`comparison-category-tab ${activeTabId === category.id ? 'is-active' : ''}`} onClick={() => setActiveTabId(category.id)} onKeyDown={(event) => navigateTabs(event, index)}>
              <span className="comparison-tab-number" aria-hidden="true">0{index + 1}</span>{category.label}
            </button>
          ))}
        </div>

        <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${activeTabId}`} tabIndex={0} className="comparison-panel">
          <div className="comparison-viewer">
            <div className="comparison-viewer-toolbar">
              <div className="comparison-file-info"><span className="comparison-file-icon"><ComparisonIcon name="document" /></span><div><p>{currentCategory.filename}</p><span>Contoh dokumen <span aria-hidden="true">·</span> A4</span></div></div>
              <div className="comparison-view-control" role="group" aria-label="Tampilan perbandingan">
                {([{ value: 'all', label: 'Bandingkan' }, { value: 'before', label: 'Sebelum' }, { value: 'after', label: 'Sesudah' }] as const).map((mode) => (
                  <button key={mode.value} type="button" aria-pressed={viewMode === mode.value} className={viewMode === mode.value ? 'is-active' : ''} onClick={() => setViewMode(mode.value)}>{mode.value === 'all' && <ComparisonIcon name="columns" />}{mode.label}</button>
                ))}
              </div>
            </div>

            <div className={`comparison-desk comparison-mode-${viewMode}`}>
              {versions.map((version) => (
                <div className={`comparison-document document-${version}`} key={`${activeTabId}-${version}`}>
                  <div className="comparison-document-bar">
                    <h3><span className={`comparison-version version-${version}`}>{version === 'after' && <ComparisonIcon name="check" />}{version === 'before' ? 'Sebelum' : 'Sesudah'}</span><span className="comparison-version-description">{version === 'before' ? 'Draf awal' : 'Setelah dirapikan'}</span></h3>
                    <button className="comparison-expand" type="button" onClick={() => setExpandedDocument(version)} aria-label={`Perbesar dokumen ${version === 'before' ? 'sebelum' : 'sesudah'}`}><ComparisonIcon name="expand" /><span>Perbesar</span></button>
                  </div>
                  <DocumentPaper category={currentCategory} version={version} />
                  <p className="comparison-paper-caption">{currentCategory[version].metadata}</p>
                </div>
              ))}
            </div>
            <div className="comparison-viewer-footer"><span><ComparisonIcon name="check" />Isi naskah tetap sama</span><span>Pilih <strong>Perbesar</strong> untuk membaca lebih dekat</span></div>
          </div>

          <div className="comparison-notes-intro"><h3>Detail yang dirapikan</h3><p>{currentCategory.description}</p></div>
          <div className={`comparison-notes comparison-mode-${viewMode}`}>
            {versions.map((version) => (
              <div className={`comparison-note note-${version}`} key={version}>
                <h4>{version === 'before' ? 'Pada draf awal' : 'Setelah penataan'}</h4>
                <ul>{currentCategory[version].evaluations.map((evaluation) => <li key={evaluation}>{version === 'after' ? <ComparisonIcon name="check" /> : <span className="comparison-note-dash" aria-hidden="true">–</span>}<span>{evaluation}</span></li>)}</ul>
              </div>
            ))}
          </div>
        </div>

        <p className="comparison-sample-note">Ilustrasi penataan naskah. Format akhir disesuaikan dengan pedoman kampus Anda.</p>
      </div>

      <dialog ref={dialog} className="comparison-reader" aria-labelledby={`${id}-reader-title`} onClose={() => setExpandedDocument(null)} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="comparison-reader-toolbar"><div><h2 id={`${id}-reader-title`}>{currentCategory.label}</h2><p>{expandedDocument === 'before' ? 'Draf awal · Sebelum dirapikan' : 'Hasil penataan · Sesudah dirapikan'}</p></div><button type="button" className="comparison-reader-close" aria-label="Tutup pratinjau dokumen" onClick={() => dialog.current?.close()}><ComparisonIcon name="close" /></button></div>
        <p className="comparison-reader-hint">Geser halaman ke samping dan ke bawah untuk membaca.</p>
        <div className="comparison-reader-canvas">{expandedDocument && <DocumentPaper category={currentCategory} version={expandedDocument} />}</div>
      </dialog>
    </section>
  );
}
