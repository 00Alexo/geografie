using UnityEngine;
using UnityEngine.SceneManagement;
using System.Collections;

public class CloudFadeOnLoad : MonoBehaviour
{
    [Tooltip("CanvasGroup on the CloudOverlay RawImage")]
    public CanvasGroup cloudGroup;
    
    [Tooltip("Time (in seconds) to fade from clear to opaque")]
    public float fadeDuration = 1f;
    
    bool isLoading = false;

    /// <summary>
    /// Call this method to fade in clouds, then load the given scene.
    /// </summary>
    public void FadeAndLoad(string sceneName)
    {
        if (!isLoading)
            StartCoroutine(FadeThenLoad(sceneName));
    }

    private IEnumerator FadeThenLoad(string sceneName)
    {
        isLoading = true;
        float t = 0f;
        
        // Fade in
        while (t < fadeDuration)
        {
            t += Time.deltaTime;
            cloudGroup.alpha = Mathf.Lerp(0f, 1f, t / fadeDuration);
            yield return null;
        }
        cloudGroup.alpha = 1f;

        // Optional small pause
        yield return new WaitForSeconds(0.2f);

        // Finally, load the scene
        SceneManager.LoadScene(sceneName);
    }
}
