export interface IWeatherWarningNews {
    '@attributes': {
        version: string;
    },
    header: {
        title: string;
        description: string;
        uri: string;
        lastBuidDate: string;
        copyRight: string;
        generator: string;
        status: string;
    },
    WarningNews: {
        IssueNo: string;
        AnnounceDateTime: string;
        TitleThai: string;
        TitleEnglish: string;
        DescriptionThai: string;
        DocumentFile: string;
        WarningTypeThai: string;
        WarningTypeEnglish: string;
        ContactDetail: object
    }
}