/**
 * MAIN CONTROLLER
 * Theme toggle, mobile navigation, interactive fullscreen lightbox gallery,
 * and dynamic portfolio management (Create, Read, Update, Delete).
 */

// ==========================================================================
// 1. Theme & Navigation Controls
// ==========================================================================
const menuButton = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const themeButton = document.querySelector('[data-theme-toggle]');
const themeLabel = document.querySelector('[data-theme-label]');

const setThemeLabel = () => {
    const isLight = document.documentElement.dataset.theme === 'light';
    if (themeLabel) {
        themeLabel.textContent = isLight ? 'Dark Mode' : 'Light Mode';
    }
};

setThemeLabel();

menuButton?.addEventListener('click', () => {
    if (!mobileMenu) return;

    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.hidden = isOpen;
});

mobileMenu?.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLAnchorElement) || !menuButton) return;

    menuButton.setAttribute('aria-expanded', 'false');
    mobileMenu.hidden = true;
});

themeButton?.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem('theme', nextTheme);
    setThemeLabel();
});

// Active scroll spy for navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
    let current = '';

    sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) {
            current = sec.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('nav-active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('nav-active');
        }
    });
});

// ==========================================================================
// 2. Toast Notification Helper
// ==========================================================================
function showToast(message) {
    const toast = document.getElementById('sysToast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('active');

    if (window._toastTimer) clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => {
        toast.classList.remove('active');
    }, 3200);
}

// ==========================================================================
// 3. Dynamic Portfolio Projects Data & CRUD Management
// ==========================================================================
const DEFAULT_PROJECTS = [
    {
        id: "proj_1",
        title: "SI-BARANG",
        kicker: "Sistem Informasi Inventaris Barang",
        description: "Aplikasi sistem informasi sekolah lengkap dengan kontrol akses multi-role (Superadmin, Admin, Staff), kalkulasi transaksi stok otomatis, dan dokumen laporan siap cetak.",
        tags: ["PHP 8", "MySQL", "Bootstrap / CSS", "RBAC", "Inventory System"],
        demo_url: "https://anggilop.freedev.app/projects/db_sekolah/",
        thumb_type: "image",
        image_url: "assets/images/sisekolah-cover.svg"
    },
    {
        id: "proj_2",
        title: "Project Beta",
        kicker: "Digital Service Platform",
        description: "Platform layanan digital yang fokus pada alur pengguna sederhana, responsive UI, dan performa cepat.",
        tags: ["JavaScript", "UX", "Performance"],
        demo_url: "",
        thumb_type: "theme-thumb-2",
        image_url: "assets/images/project-beta-cover.svg"
    },
    {
        id: "proj_3",
        title: "Project Gamma",
        kicker: "Company Profile & SEO",
        description: "Website company profile responsif dengan struktur konten yang mudah dirawat dan ramah mesin pencari.",
        tags: ["HTML", "CSS", "SEO"],
        demo_url: "",
        thumb_type: "theme-thumb-3",
        image_url: "assets/images/project-gamma-cover.svg"
    }
];

const STORAGE_KEY = 'anggi_portfolio_projects';

function sanitizeProject(p, index) {
    if (!p || typeof p !== 'object') p = {};
    return {
        id: String(p.id || 'proj_' + (index + 1)),
        title: String(p.title || 'Untitled Project'),
        kicker: String(p.kicker || 'Project'),
        description: String(p.description || ''),
        tags: Array.isArray(p.tags)
            ? p.tags.map(t => String(t).trim()).filter(Boolean)
            : (typeof p.tags === 'string' ? p.tags.split(',').map(s => s.trim()).filter(Boolean) : []),
        demo_url: String(p.demo_url || ''),
        thumb_type: String(p.thumb_type || 'image'),
        image_url: String(p.image_url || '')
    };
}

function getStoredProjects() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data !== null) {
            const parsed = JSON.parse(data);
            if (Array.isArray(parsed)) {
                return parsed.map(sanitizeProject);
            }
        }
    } catch (e) {
        console.error('Error loading projects from localStorage:', e);
    }
    return DEFAULT_PROJECTS.map(sanitizeProject);
}

function saveProjects(projectsList) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projectsList));
    } catch (e) {
        console.error('Error saving projects to localStorage:', e);
        showToast('Peringatan: Gagal menyimpan ke localStorage.');
    }
}

// Global active projects array
let projects = getStoredProjects();

// Render Projects to DOM
const projectsGrid = document.getElementById('projectsGrid');
const projectCountBadge = document.getElementById('projectCountBadge');

function renderProjects() {
    if (!projectsGrid) return;

    if (projectCountBadge) {
        projectCountBadge.textContent = `Total ${projects.length} Proyek`;
    }

    if (projects.length === 0) {
        projectsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--subtle);">
                <p style="font-size: 1.1rem; margin-bottom: 1.2rem;">Belum ada proyek di portofolio.</p>
                <button type="button" class="btn btn-primary" id="btnEmptyAdd">
                    + Tambah Proyek Pertama
                </button>
            </div>
        `;
        document.getElementById('btnEmptyAdd')?.addEventListener('click', openAddModal);
        return;
    }

    projectsGrid.innerHTML = projects.map((item, index) => {
        const isImage = item.thumb_type === 'image' && item.image_url;
        const thumbHtml = isImage
            ? `<div class="project-thumb has-image">
                 <img src="${item.image_url}" alt="${item.title} Preview" loading="lazy" class="card-thumb-img">
               </div>`
            : `<div class="project-thumb ${item.thumb_type || 'theme-thumb-2'}">
                 <span>P</span>
               </div>`;

        const demoBtnHtml = item.demo_url
            ? `<a href="${item.demo_url}" target="_blank" rel="noopener noreferrer" class="btn-card-demo" title="Buka Live Demo">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                   <circle cx="12" cy="12" r="10"></circle>
                   <line x1="2" y1="12" x2="22" y2="12"></line>
                   <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                 </svg>
                 <span>Demo</span>
               </a>`
            : '';

        const tagsArray = Array.isArray(item.tags)
            ? item.tags
            : (typeof item.tags === 'string' ? item.tags.split(',').map(s => s.trim()).filter(Boolean) : []);
        const tagsHtml = tagsArray.map(t => `<span>${t}</span>`).join('');

        return `
            <article class="project-card" data-project-id="${item.id}">
                <a href="#galleryModal" class="project-thumb-link" data-gallery-trigger="${index}" aria-label="Lihat detail ${item.title}">
                    ${thumbHtml}
                </a>

                <div class="project-body">
                    <p class="card-kicker">${item.kicker || 'Project'}</p>
                    <h3>
                        <a href="#galleryModal" class="project-title-link" data-gallery-trigger="${index}">
                            ${item.title}
                        </a>
                    </h3>
                    <p>${item.description || ''}</p>
                    
                    <div class="tag-row" aria-label="Teknologi">
                        ${tagsHtml}
                    </div>

                    <div class="project-card-actions">
                        <button type="button" class="btn-card-detail" data-gallery-trigger="${index}">
                            <span>Lihat Detail &amp; Gallery</span>
                            <span aria-hidden="true">→</span>
                        </button>
                        ${demoBtnHtml}
                    </div>

                    <div class="project-card-admin-bar">
                        <button type="button" class="btn-admin-pill edit" data-edit-id="${item.id}" title="Edit proyek ini">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                            <span>Edit Proyek</span>
                        </button>
                        <button type="button" class="btn-admin-pill delete" data-delete-id="${item.id}" title="Hapus proyek ini">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                            <span>Hapus</span>
                        </button>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

// Single Event Delegation for projectsGrid (handles Edit, Delete, and Lightbox Gallery clicks)
projectsGrid?.addEventListener('click', (e) => {
    // 1. Edit button clicked
    const editBtn = e.target.closest('[data-edit-id]');
    if (editBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = editBtn.getAttribute('data-edit-id');
        openEditModal(id);
        return;
    }

    // 2. Delete button clicked
    const deleteBtn = e.target.closest('[data-delete-id]');
    if (deleteBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = deleteBtn.getAttribute('data-delete-id');
        deleteProject(id);
        return;
    }

    // 3. Gallery triggers (thumb link, title link, detail button)
    const galleryTrigger = e.target.closest('[data-gallery-trigger]');
    if (galleryTrigger) {
        e.preventDefault();
        const idx = parseInt(galleryTrigger.getAttribute('data-gallery-trigger') || '0', 10);
        openGalleryModal(idx);
        return;
    }
});

// ==========================================================================
// 4. Project Editor Modal (Add / Edit Form)
// ==========================================================================
const editorModal = document.getElementById('projectEditorModal');
const editorBackdrop = document.getElementById('editorBackdrop');
const btnCancelEditor = document.getElementById('btnCancelEditor');
const btnCancelEditor2 = document.getElementById('btnCancelEditor2');
const projectForm = document.getElementById('projectForm');
const editorModalTitle = document.getElementById('editorModalTitle');

const editProjectIdInput = document.getElementById('editProjectId');
const formProjTitle = document.getElementById('formProjTitle');
const formProjKicker = document.getElementById('formProjKicker');
const formProjDesc = document.getElementById('formProjDesc');
const formProjTags = document.getElementById('formProjTags');
const formProjDemo = document.getElementById('formProjDemo');
const formThumbType = document.getElementById('formThumbType');
const formProjImage = document.getElementById('formProjImage');
const formProjFile = document.getElementById('formProjFile');
const groupImageUrl = document.getElementById('groupImageUrl');

// Toggle Image URL input depending on thumbnail type
formThumbType?.addEventListener('change', () => {
    if (groupImageUrl) {
        groupImageUrl.style.display = formThumbType.value === 'image' ? 'flex' : 'none';
    }
});

function openAddModal() {
    if (!editorModal || !projectForm) return;

    projectForm.reset();
    editProjectIdInput.value = '';
    editorModalTitle.textContent = 'Tambah Proyek Baru';
    formThumbType.value = 'image';
    if (groupImageUrl) groupImageUrl.style.display = 'flex';

    editorModal.hidden = false;
    editorModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    formProjTitle.focus();
}

function openEditModal(projectId) {
    const target = projects.find(p => p.id === projectId);
    if (!target || !editorModal || !projectForm) return;

    projectForm.reset();
    editProjectIdInput.value = target.id;
    editorModalTitle.textContent = `Edit Proyek: ${target.title}`;

    formProjTitle.value = target.title || '';
    formProjKicker.value = target.kicker || '';
    formProjDesc.value = target.description || '';
    formProjTags.value = (target.tags || []).join(', ');
    formProjDemo.value = target.demo_url || '';
    formThumbType.value = target.thumb_type || 'image';
    formProjImage.value = target.image_url || '';

    if (groupImageUrl) {
        groupImageUrl.style.display = formThumbType.value === 'image' ? 'flex' : 'none';
    }

    editorModal.hidden = false;
    editorModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    formProjTitle.focus();
}

function closeEditorModal() {
    if (!editorModal) return;
    editorModal.hidden = true;
    editorModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

btnCancelEditor?.addEventListener('click', closeEditorModal);
btnCancelEditor2?.addEventListener('click', closeEditorModal);
editorBackdrop?.addEventListener('click', closeEditorModal);

// Top Action Buttons
document.getElementById('btnAddNewProject')?.addEventListener('click', openAddModal);

document.getElementById('btnResetProjects')?.addEventListener('click', () => {
    if (confirm('Kembalikan semua proyek ke konfigurasi default awal?')) {
        projects = DEFAULT_PROJECTS.map(sanitizeProject);
        saveProjects(projects);
        renderProjects();
        showToast('✓ Proyek berhasil direset ke default.');
    }
});

// Delete Project
function deleteProject(id) {
    const target = projects.find(p => p.id === id);
    if (!target) return;

    if (confirm(`Yakin ingin menghapus proyek "${target.title}"?`)) {
        projects = projects.filter(p => p.id !== id);
        saveProjects(projects);
        renderProjects();
        showToast(`✓ Proyek "${target.title}" telah dihapus.`);
    }
}

// Form Submit (Create or Update)
projectForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = formProjTitle ? formProjTitle.value.trim() : '';
    const kicker = formProjKicker ? formProjKicker.value.trim() : '';
    const desc = formProjDesc ? formProjDesc.value.trim() : '';
    const tags = formProjTags 
        ? formProjTags.value.split(',').map(t => t.trim()).filter(Boolean)
        : [];
    let demo = formProjDemo ? formProjDemo.value.trim() : '';
    if (demo && !demo.startsWith('http://') && !demo.startsWith('https://') && !demo.startsWith('#')) {
        demo = 'https://' + demo;
    }
    const thumbType = formThumbType ? formThumbType.value : 'image';
    let imageUrl = formProjImage ? formProjImage.value.trim() : '';

    // Check if user uploaded a file
    if (thumbType === 'image' && formProjFile?.files && formProjFile.files[0]) {
        try {
            imageUrl = await readFileAsDataUrl(formProjFile.files[0]);
        } catch (err) {
            console.error('File read error:', err);
        }
    }

    // Default fallback image if none provided for image type
    if (thumbType === 'image' && !imageUrl) {
        imageUrl = 'assets/images/sibarang-cover.svg';
    }

    const editId = editProjectIdInput ? editProjectIdInput.value : '';

    if (editId) {
        // Update existing
        const index = projects.findIndex(p => p.id === editId);
        if (index !== -1) {
            projects[index] = {
                ...projects[index],
                title,
                kicker,
                description: desc,
                tags,
                demo_url: demo,
                thumb_type: thumbType,
                image_url: imageUrl
            };
            showToast(`✓ Proyek "${title}" berhasil diperbarui!`);
        }
    } else {
        // Create new
        const newProject = {
            id: 'proj_' + Date.now(),
            title,
            kicker,
            description: desc,
            tags,
            demo_url: demo,
            thumb_type: thumbType,
            image_url: imageUrl
        };
        projects.push(newProject);
        showToast(`✓ Proyek baru "${title}" berhasil ditambahkan!`);
    }

    saveProjects(projects);
    renderProjects();
    closeEditorModal();
});

function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        if (!file) return resolve('');
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target.result;
            // Compress large images (> 400KB) with Canvas to ensure smooth localStorage storage
            if (file.size > 400 * 1024 && file.type.startsWith('image/')) {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const maxDim = 1200;
                    let width = img.width;
                    let height = img.height;
                    if (width > maxDim || height > maxDim) {
                        if (width > height) {
                            height = Math.round((height * maxDim) / width);
                            width = maxDim;
                        } else {
                            width = Math.round((width * maxDim) / height);
                            height = maxDim;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', 0.85));
                };
                img.onerror = () => resolve(result);
                img.src = result;
            } else {
                resolve(result);
            }
        };
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
    });
}

// ==========================================================================
// 5. Interactive Fullscreen Gallery Lightbox
// ==========================================================================
const galleryModal = document.getElementById('galleryModal');
const modalTitle = document.getElementById('modalImageTitle');
const modalTag = document.getElementById('modalProjectTag');
const modalImage = document.getElementById('modalMainImage');
const modalCounter = document.getElementById('modalImageCounter');
const modalDesc = document.getElementById('modalImageDesc');
const prevButton = document.querySelector('[data-gallery-prev]');
const nextButton = document.querySelector('[data-gallery-next]');
const closeButton = document.querySelector('[data-gallery-close]');
const backdrop = document.querySelector('[data-gallery-backdrop]');

let currentGalleryIndex = 0;

function renderGallerySlide(index) {
    if (projects.length === 0) return;

    if (index < 0) {
        index = projects.length - 1;
    } else if (index >= projects.length) {
        index = 0;
    }

    currentGalleryIndex = index;
    const item = projects[currentGalleryIndex];
    if (!item) return;

    const imgUrl = (item.thumb_type === 'image' && item.image_url) 
        ? item.image_url 
        : (item.image_url || 'assets/images/sibarang-cover.svg');

    if (modalImage) {
        modalImage.style.opacity = '0';
        modalImage.src = imgUrl;
        modalImage.alt = item.title || 'Project preview';
        modalImage.onload = () => {
            modalImage.style.opacity = '1';
        };
    }

    if (modalTitle) {
        modalTitle.textContent = item.title || 'Project Preview';
    }

    if (modalTag) {
        modalTag.textContent = (item.kicker || 'PORTOFOLIO SHOWCASE').toUpperCase();
    }

    if (modalCounter) {
        modalCounter.textContent = `${currentGalleryIndex + 1} / ${projects.length}`;
    }

    if (modalDesc) {
        modalDesc.textContent = item.description || '';
    }
}

function openGalleryModal(index) {
    if (!galleryModal || projects.length === 0) return;

    galleryModal.hidden = false;
    galleryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    renderGallerySlide(index);
    closeButton?.focus();
}

function closeGalleryModal() {
    if (!galleryModal) return;
    galleryModal.hidden = true;
    galleryModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

closeButton?.addEventListener('click', closeGalleryModal);
backdrop?.addEventListener('click', closeGalleryModal);

prevButton?.addEventListener('click', (e) => {
    e.stopPropagation();
    renderGallerySlide(currentGalleryIndex - 1);
});

nextButton?.addEventListener('click', (e) => {
    e.stopPropagation();
    renderGallerySlide(currentGalleryIndex + 1);
});

// Universal Keyboard Handler
document.addEventListener('keydown', (event) => {
    // 1. If Editor Modal is open
    if (editorModal && !editorModal.hidden) {
        if (event.key === 'Escape') {
            event.preventDefault();
            closeEditorModal();
        }
        return;
    }

    // 2. If Gallery Lightbox is open
    if (galleryModal && !galleryModal.hidden) {
        if (event.key === 'Escape') {
            event.preventDefault();
            closeGalleryModal();
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            renderGallerySlide(currentGalleryIndex - 1);
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            renderGallerySlide(currentGalleryIndex + 1);
        }
        return;
    }

    // 3. If Mobile Menu is open
    if (event.key === 'Escape' && mobileMenu && !mobileMenu.hidden) {
        menuButton?.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
    }
});

// Initial Render
renderProjects();
