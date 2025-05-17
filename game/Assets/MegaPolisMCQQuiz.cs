using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using UnityEngine.SceneManagement;

public class MegaPolisMCQQuiz : MonoBehaviour
{
    [Header("UI References")]
    public TMP_Text questionText;
    public TMP_Text scoreText;
    public Button[] optionButtons;        // 3 butoane de răspuns
    public TMP_Text[] optionLabels;       // TMP_Text-urile din interiorul butoanelor
    public Button returnButton;

    [Header("Audio References")]
    public AudioSource audioSource;
    public AudioClip correctSound;
    public AudioClip wrongSound;

    private struct Question
    {
        public string prompt;
        public string[] choices;
        public int correctIndex;
        public Question(string p, string[] c, int ci) { prompt = p; choices = c; correctIndex = ci; }
    }

    private List<Question> questions;
    private int current = 0;
    private int score = 0;

    void Awake()
    {
        // Definim întrebările
        questions = new List<Question>()
        {
            new Question(
                "Dă click pe regiunea unde se află marile centre financiare europene.",
                new string[]{ "Banana Albastră", "Banana de Aur", "Banana Verde" },
                0
            ),
            new Question(
                "Selectează zona mediteraneană, renumită pentru plajele însorite și porturile sale.",
                new string[]{ "Banana de Aur", "Axa Atlantică", "Coridorul urban european" },
                0
            ),
            new Question(
                "Alege regiunea cunoscută pentru coridoarele verzi și spațiile naturale protejate.",
                new string[]{ "Banana Verde", "Golgul Finlandei", "Banana Albastră" },
                0
            ),
            new Question(
                "Apasă pe regiunea de la intrarea în Marea Baltică, unde Helsinki și Tallinn sunt orașele principale.",
                new string[]{ "Golgul Finlandei", "Banana Verde", "Axa Atlantică" },
                0
            ),
            new Question(
                "Găsește banda de orașe de-a lungul coastei de vest a Europei, de la Irlanda până în Spania.",
                new string[]{ "Axa Atlantică", "Coridorul urban european", "Banana de Aur" },
                0
            ),
            new Question(
                "Click pe legătura urbană care unește Londra, Paris și Milano.",
                new string[]{ "Coridorul urban european", "Banana Albastră", "Golgul Finlandei" },
                0
            )
        };

        // Ascunde butonul Return la început
        if (returnButton != null)
            returnButton.gameObject.SetActive(false);
    }

    void Start()
    {
        score = 0;
        current = 0;
        UpdateUI();
    }

    void UpdateUI()
    {
        // Dacă am terminat quiz-ul
        if (current >= questions.Count)
        {
            questionText.text = "<b>Test complet!</b>";
            scoreText.text = $"Scor: {score}/{questions.Count}";
            foreach (var btn in optionButtons)
                btn.gameObject.SetActive(false);
            if (returnButton != null)
                returnButton.gameObject.SetActive(true);
            return;
        }

        // Afișează întrebarea curentă și scorul
        var q = questions[current];
        questionText.text = q.prompt;
        scoreText.text = $"Scor: {score}/{questions.Count}";

        // Configurează opțiunile
        for (int i = 0; i < optionButtons.Length; i++)
        {
            optionButtons[i].gameObject.SetActive(true);
            optionLabels[i].text = q.choices[i];
            int idx = i;
            optionButtons[i].onClick.RemoveAllListeners();
            optionButtons[i].onClick.AddListener(() => OnChoiceSelected(idx));
        }
    }

    void OnChoiceSelected(int index)
    {
        bool correct = (index == questions[current].correctIndex);
        if (correct)
        {
            score++;
            if (audioSource != null && correctSound != null)
                audioSource.PlayOneShot(correctSound);
        }
        else
        {
            if (audioSource != null && wrongSound != null)
                audioSource.PlayOneShot(wrongSound);
        }

        current++;
        UpdateUI();
    }

    public void OnReturnToMenu()
    {
        SceneManager.LoadScene("SampleScene");
    }
}
