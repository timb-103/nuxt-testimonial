/**
 * To increase performance we can use this funciton to only show certain elements once they are near the viewport.
 *
 * It's mostly used for the analytics pages, as they're long with lot's of API calls, but can be used for
 * any element in the app. Just pass a function for it to call once it's near the viewport.
 *
 * TO DO: We should probably fire an unobserve event if the page is changed, or component unmounted.
 */

export function useElementIntersection(callback: () => void, element: HTMLElement) {
  const options: IntersectionObserverInit = {
    rootMargin: '300px',
    threshold: 0,
  }

  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement
        observer.unobserve(el)
        callback()
      }
    })
  }

  const observer = new IntersectionObserver(observerCallback, options)
  observer.observe(element)
}
