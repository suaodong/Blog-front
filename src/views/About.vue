<script setup lang="ts">
type Link = { label: string; href: string };
type Project = { name: string; desc: string; stack: string[]; link?: string };
type TimelineItem = { year: string; title: string; desc: string };

const profile = {
  name: '某某',
  title: '前端工程师 / 记录者',
  tagline: '把复杂的东西讲清楚，把有用的经验留下来。',
  location: 'China · Remote friendly',
  email: 'hello@example.com',
  avatarText: 'AG',
  links: [
    { label: 'GitHub', href: 'https://github.com/yourname' },
    { label: '掘金', href: 'https://juejin.cn/user/0' },
    { label: '知乎', href: 'https://www.zhihu.com/people/0' },
  ] satisfies Link[],
  skills: [
    { group: 'Frontend', items: ['Vue 3', 'React', 'TypeScript', 'Vite', 'Tailwind'] },
    { group: 'Engineering', items: ['Monorepo', 'CI/CD', 'Lint/Format', 'Performance', 'Testing'] },
    { group: 'Thinking', items: ['Architecture', 'DX', 'Writing', 'Design taste'] },
  ],
  timeline: [
    { year: '2026', title: '写作与系统化', desc: '把项目经验整理成可复用的组件/模板/方法论。' },
    { year: '2024', title: '工程化与性能', desc: '关注构建、规范、性能与可维护性，做“长期正确”的选择。' },
    { year: '2022', title: '业务与抽象', desc: '在复杂业务里练习抽象边界：哪些应该被复用，哪些应该被删掉。' },
  ] satisfies TimelineItem[],
  projects: [
    {
      name: 'Blog Front (ANTIGRAVITY)',
      desc: '个人博客前端：双主题、沉浸式阅读、分类与搜索。',
      stack: ['Vue 3', 'Vite', 'Tailwind', 'TypeScript'],
      link: 'https://example.com',
    },
    {
      name: 'Design Tokens Kit',
      desc: '一套轻量的 tokens 体系：主题、排版、阴影与组件基线。',
      stack: ['CSS Vars', 'Tailwind', 'A11y'],
    },
    {
      name: 'Build & DX Playground',
      desc: '实验性工程化仓库：分包、缓存、产物分析与脚手架化。',
      stack: ['Vite', 'Rollup', 'CI'],
    },
  ] satisfies Project[],
};
</script>

<template>
  <div class="relative min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="animate-fade-in-up">
        <div class="flex items-center gap-3">
          <span class="inline-flex items-center gap-2 rounded-full px-3 py-1 border border-(--stroke) bg-[color-mix(in_oklab,var(--panel)_70%,transparent)]">
            <span class="h-2 w-2 rounded-full bg-(--accent)"></span>
            <span class="text-xs tracking-[0.22em] uppercase text-(--muted)">About</span>
          </span>
          <span class="text-xs tracking-[0.22em] uppercase text-(--muted-2)">Mock profile · 可替换为真实信息</span>
        </div>
      </div>

      <div class="mt-10 grid lg:grid-cols-12 gap-8 items-start">
        <!-- Left: identity card -->
        <aside class="lg:col-span-4 animate-fade-in-up delay-100">
          <div class="rounded-4xl border border-(--stroke) bg-[color-mix(in_oklab,var(--panel-strong)_82%,transparent)] backdrop-blur-md p-6 shadow-(--shadow)">
            <div class="flex items-start gap-4">
              <div class="relative">
                <div class="h-14 w-14 rounded-2xl border border-(--stroke) bg-[color-mix(in_oklab,var(--panel)_85%,transparent)] grid place-items-center">
                  <div class="text-lg font-semibold tracking-[0.12em]" style="font-family: var(--font-display)">
                    {{ profile.avatarText }}
                  </div>
                </div>
                <div aria-hidden="true" class="absolute -bottom-2 -right-2 h-7 w-7 rounded-full blur-xl opacity-70 bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--accent)_55%,transparent),transparent_65%)]"></div>
              </div>

              <div class="min-w-0">
                <div class="text-2xl font-semibold tracking-tight" style="font-family: var(--font-display)">
                  {{ profile.name }}
                </div>
                <div class="mt-1 text-sm text-(--muted)">{{ profile.title }}</div>
                <div class="mt-3 text-sm leading-relaxed text-(--muted)">
                  {{ profile.tagline }}
                </div>
              </div>
            </div>

            <div class="mt-6 space-y-2 text-sm">
              <div class="flex items-center justify-between">
                <span class="text-(--muted-2)">Location</span>
                <span class="font-semibold">{{ profile.location }}</span>
              </div>
              <div class="h-px bg-[color-mix(in_oklab,var(--stroke)_70%,transparent)]"></div>
              <div class="flex items-center justify-between gap-3">
                <span class="text-(--muted-2)">Email</span>
                <a class="font-semibold hover:text-(--accent) transition-colors truncate" :href="`mailto:${profile.email}`">
                  {{ profile.email }}
                </a>
              </div>
            </div>

            <div class="mt-6 flex flex-wrap gap-2">
              <a
                v-for="l in profile.links"
                :key="l.label"
                :href="l.href"
                target="_blank"
                rel="noreferrer"
                class="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold border border-(--stroke) bg-[color-mix(in_oklab,var(--panel)_78%,transparent)] hover:bg-[color-mix(in_oklab,var(--panel)_92%,transparent)] transition-colors"
              >
                <span>{{ l.label }}</span>
                <span class="text-(--muted-2)">↗</span>
              </a>
            </div>
          </div>

          <div class="mt-6 rounded-3xl border border-(--stroke) bg-[color-mix(in_oklab,var(--panel)_70%,transparent)] p-6 animate-fade-in-up delay-200">
            <div class="text-xs tracking-[0.22em] uppercase text-(--muted-2)">This blog</div>
            <p class="mt-3 text-sm leading-relaxed text-(--muted)">
              我写技术，也写“技术之外”：决策、取舍、复盘、审美。希望你在这里拿到的是可复用的经验，而不是一堆截图。
            </p>
            <ul class="mt-4 space-y-2 text-sm text-(--muted)">
              <li>优先写清楚“为什么这样做”。</li>
              <li>不追热点，追长期有效的做法。</li>
              <li>每篇文章都尽量能落地。</li>
            </ul>
          </div>
        </aside>

        <!-- Right: content -->
        <section class="lg:col-span-8 space-y-8 animate-fade-in-up delay-200">
          <!-- Skills -->
          <div class="rounded-4xl border border-(--stroke) bg-[color-mix(in_oklab,var(--panel-strong)_82%,transparent)] backdrop-blur-md p-6 shadow-(--shadow)">
            <div class="flex items-baseline justify-between gap-4">
              <div class="text-xs tracking-[0.22em] uppercase text-(--muted-2)">Skills</div>
              <div class="text-xs tracking-[0.22em] uppercase text-(--muted)">focus on fundamentals</div>
            </div>

            <div class="mt-5 grid md:grid-cols-3 gap-4">
              <div
                v-for="s in profile.skills"
                :key="s.group"
                class="rounded-3xl border border-(--stroke) bg-[color-mix(in_oklab,var(--panel)_72%,transparent)] p-5"
              >
                <div class="text-sm font-semibold" style="font-family: var(--font-display)">{{ s.group }}</div>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span
                    v-for="it in s.items"
                    :key="it"
                    class="rounded-full px-3 py-1 text-xs font-semibold border border-(--stroke) bg-[color-mix(in_oklab,var(--panel)_78%,transparent)]"
                  >
                    {{ it }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Timeline -->
          <div class="rounded-4xl border border-(--stroke) bg-[color-mix(in_oklab,var(--panel-strong)_82%,transparent)] backdrop-blur-md p-6 shadow-(--shadow)">
            <div class="text-xs tracking-[0.22em] uppercase text-(--muted-2)">Timeline</div>
            <div class="mt-5 space-y-4">
              <div
                v-for="t in profile.timeline"
                :key="t.year"
                class="rounded-3xl border border-(--stroke) bg-[color-mix(in_oklab,var(--panel)_72%,transparent)] p-5"
              >
                <div class="flex items-center justify-between gap-4">
                  <div class="text-lg font-semibold" style="font-family: var(--font-display)">{{ t.title }}</div>
                  <div class="text-xs tracking-[0.22em] uppercase text-(--muted-2)">{{ t.year }}</div>
                </div>
                <p class="mt-2 text-sm leading-relaxed text-(--muted)">{{ t.desc }}</p>
              </div>
            </div>
          </div>

          <!-- Projects -->
          <div class="rounded-4xl border border-(--stroke) bg-[color-mix(in_oklab,var(--panel-strong)_82%,transparent)] backdrop-blur-md p-6 shadow-(--shadow)">
            <div class="text-xs tracking-[0.22em] uppercase text-(--muted-2)">Projects</div>
            <div class="mt-5 grid md:grid-cols-2 gap-4">
              <article
                v-for="p in profile.projects"
                :key="p.name"
                class="group rounded-3xl border border-(--stroke) bg-[color-mix(in_oklab,var(--panel)_72%,transparent)] p-5 hover:translate-y-[-2px] transition-transform"
              >
                <div class="flex items-start justify-between gap-3">
                  <div class="text-lg font-semibold leading-tight" style="font-family: var(--font-display)">
                    {{ p.name }}
                  </div>
                  <a
                    v-if="p.link"
                    :href="p.link"
                    target="_blank"
                    rel="noreferrer"
                    class="text-sm font-semibold text-(--muted-2) group-hover:text-(--accent) transition-colors"
                  >
                    ↗
                  </a>
                </div>
                <p class="mt-2 text-sm leading-relaxed text-(--muted)">{{ p.desc }}</p>
                <div class="mt-4 flex flex-wrap gap-2">
                  <span
                    v-for="s in p.stack"
                    :key="s"
                    class="rounded-full px-3 py-1 text-xs font-semibold border border-(--stroke) bg-[color-mix(in_oklab,var(--panel)_78%,transparent)]"
                  >
                    {{ s }}
                  </span>
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}
</style>

