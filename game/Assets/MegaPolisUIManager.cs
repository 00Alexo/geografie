using TMPro;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class MegaPolisUIManager : MonoBehaviour
{
    [Header("UI Elements")]
    public TMP_Text questionText;
    public TMP_Text scoreText;
    public Button returnButton;

    [Header("Position Settings")]
    public RectTransform uiPanel;

    private int totalQuestions = 6;
    private int currentScore = 0;
    private int answersGiven = 0;

    public void SetQuestion(string text)
    {
        if (questionText == null) return;

        if (text == "Test complet!")
        {
            questionText.text = $"<b>{text}</b>";
        }
        else
        {
            questionText.text = $"«Dă click pe: {text}»";
        }
    }

    public void SetScore(int current, int total)
    {
        currentScore = current;
        totalQuestions = total;

        if (scoreText != null)
            scoreText.text = $"Scor: {currentScore} / {totalQuestions}";
    }

    public void RegisterAnswer()
    {
        answersGiven++;

        // Arată butonul DOAR când s-au dat 6 răspunsuri
        if (answersGiven >= totalQuestions && returnButton != null)
        {
            returnButton.gameObject.SetActive(true);
        }
    }

    public void OnReturnToMenu()
    {
        SceneManager.LoadScene("InainteScene");
    }

    void Start()
    {
        if (uiPanel != null)
        {
            uiPanel.anchorMin = new Vector2(0, 1);
            uiPanel.anchorMax = new Vector2(0, 1);
            uiPanel.pivot = new Vector2(0, 1);
            uiPanel.anchoredPosition = new Vector2(20, -20);
        }

        if (returnButton != null)
            returnButton.gameObject.SetActive(false);
    }
}
